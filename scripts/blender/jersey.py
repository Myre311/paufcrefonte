"""
jersey.py - Procedural low-poly football jersey generator (Blender headless)

Creates a low-poly short-sleeve football jersey for the Pau FC customizer.
Generates a torso, two side sleeves, a round neckline, applies materials and
UVs, then exports a Draco-compressed GLB.

Run:
    blender --background --python scripts/blender/jersey.py -- <output_path>

Tweakable parameters at the top of the file. Deterministic (random.seed(0)).

Mesh layout (Collection "Jersey"):
    - jersey_torso          (main body, with mat_jersey_main + mat_jersey_back)
    - jersey_sleeve_left
    - jersey_sleeve_right

Output:
    - GLB binary, +Y up, modifiers applied, no textures embedded.
    - Draco compression level 6 (auto-fallback to no Draco if codec missing).
"""

import bpy
import bmesh
import math
import random
import sys
import os

# ----------------------------------------------------------------------------
# Tweakable parameters
# ----------------------------------------------------------------------------
TARGET_TRIS = 3000
MAX_TRIS = 4000
MAIN_COLOR_HEX = "#1A1D38"   # Pau FC navy
SUBSURF_LEVEL = 2
SOLIDIFY_THICKNESS = 0.02

# Dimensions in meters
TORSO_WIDTH = 0.70
TORSO_HEIGHT = 0.75
TORSO_DEPTH = 0.18
SLEEVE_LENGTH = 0.25
SLEEVE_RADIUS = 0.10
NECKLINE_RADIUS = 0.07

DEFAULT_OUTPUT = "/Users/mark/dev/paufcrefonte/public/models/jersey.glb"

random.seed(0)


# ----------------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------------
def hex_to_rgba(hex_str, alpha=1.0):
    h = hex_str.lstrip("#")
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0
    # sRGB to linear (Blender expects linear in node values)
    def to_linear(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (to_linear(r), to_linear(g), to_linear(b), alpha)


def parse_args():
    argv = sys.argv
    if "--" in argv:
        idx = argv.index("--")
        user_args = argv[idx + 1:]
    else:
        user_args = []
    output_path = user_args[0] if user_args else DEFAULT_OUTPUT
    return output_path


def make_material(name, hex_color, roughness=0.7, metallic=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf is None:
        bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = hex_to_rgba(hex_color)
    if "Roughness" in bsdf.inputs:
        bsdf.inputs["Roughness"].default_value = roughness
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = metallic
    return mat


def ensure_collection(name):
    if name in bpy.data.collections:
        return bpy.data.collections[name]
    coll = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(coll)
    return coll


def link_to_collection(obj, coll):
    # unlink from default scene collection if linked
    for c in obj.users_collection:
        c.objects.unlink(obj)
    coll.objects.link(obj)


def select_only(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj


def smart_uv(obj):
    select_only(obj)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    try:
        bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
    except Exception as exc:
        print(f"[jersey] smart_project warning on {obj.name}: {exc}")
    bpy.ops.object.mode_set(mode="OBJECT")


def apply_all_modifiers(obj):
    select_only(obj)
    for mod in list(obj.modifiers):
        try:
            bpy.ops.object.modifier_apply(modifier=mod.name)
        except Exception as exc:
            print(f"[jersey] could not apply modifier {mod.name} on {obj.name}: {exc}")


def tri_count(obj):
    me = obj.data
    n = 0
    for poly in me.polygons:
        n += max(0, len(poly.vertices) - 2)
    return n


# ----------------------------------------------------------------------------
# Geometry builders
# ----------------------------------------------------------------------------
def build_torso():
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.0, 0.0, 0.0))
    obj = bpy.context.active_object
    obj.name = "jersey_torso"
    obj.scale = (TORSO_WIDTH / 2.0, TORSO_DEPTH / 2.0, TORSO_HEIGHT / 2.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    # Loop cuts to add geometry, especially horizontal rings for shoulders / waist
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")

    me = obj.data
    bm = bmesh.from_edit_mesh(me)
    bm.faces.ensure_lookup_table()

    # Add subdivisions along Z (height) and X (width) via subdivide
    bmesh.ops.subdivide_edges(
        bm,
        edges=bm.edges[:],
        cuts=2,
        use_grid_fill=True,
    )
    bmesh.update_edit_mesh(me)

    # Round the silhouette slightly: pull top vertices inward (shoulders narrower)
    bm = bmesh.from_edit_mesh(me)
    for v in bm.verts:
        # Top of mesh (high Z): squeeze X a bit
        if v.co.z > TORSO_HEIGHT * 0.40:
            v.co.x *= 0.85
        # Bottom: slight tapering
        if v.co.z < -TORSO_HEIGHT * 0.40:
            v.co.x *= 0.95

    bmesh.update_edit_mesh(me)
    bpy.ops.object.mode_set(mode="OBJECT")

    # Carve a circular neckline at the top by deleting top-center faces and
    # reshaping nearby verts toward a circle.
    bpy.ops.object.mode_set(mode="EDIT")
    bm = bmesh.from_edit_mesh(me)
    bm.faces.ensure_lookup_table()

    top_z = max(v.co.z for v in bm.verts)
    neck_faces = []
    for f in bm.faces:
        c = f.calc_center_median()
        if c.z > top_z - 1e-3 and abs(c.x) < NECKLINE_RADIUS * 1.2:
            neck_faces.append(f)
    if neck_faces:
        bmesh.ops.delete(bm, geom=neck_faces, context="FACES")
    bmesh.update_edit_mesh(me)
    bpy.ops.object.mode_set(mode="OBJECT")

    # Modifiers: Solidify (gives thickness if we ever switch to plane), Subsurf
    solidify = obj.modifiers.new("Solidify", "SOLIDIFY")
    solidify.thickness = SOLIDIFY_THICKNESS
    solidify.offset = 0.0

    subsurf = obj.modifiers.new("Subdivision", "SUBSURF")
    subsurf.levels = SUBSURF_LEVEL
    subsurf.render_levels = SUBSURF_LEVEL

    return obj


def build_sleeve(name, side):
    """side: -1 left, +1 right"""
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=12,
        radius=SLEEVE_RADIUS,
        depth=SLEEVE_LENGTH,
        location=(side * (TORSO_WIDTH / 2.0 + SLEEVE_LENGTH / 2.0 - 0.02),
                  0.0,
                  TORSO_HEIGHT * 0.30),
        rotation=(0.0, math.radians(90.0), 0.0),
    )
    obj = bpy.context.active_object
    obj.name = name

    subsurf = obj.modifiers.new("Subdivision", "SUBSURF")
    subsurf.levels = 1
    subsurf.render_levels = 1

    return obj


def assign_materials(torso, mat_main, mat_back):
    me = torso.data
    if len(me.materials) == 0:
        me.materials.append(mat_main)
        me.materials.append(mat_back)
    else:
        me.materials[0] = mat_main
        if len(me.materials) < 2:
            me.materials.append(mat_back)
        else:
            me.materials[1] = mat_back

    # Assign back faces (faces with normal pointing -Y) to slot 1.
    for poly in me.polygons:
        if poly.normal.y < -0.5:
            poly.material_index = 1
        else:
            poly.material_index = 0


def assign_single_material(obj, mat):
    me = obj.data
    if len(me.materials) == 0:
        me.materials.append(mat)
    else:
        me.materials[0] = mat


# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------
def main():
    output_path = parse_args()
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Clean start
    bpy.ops.wm.read_factory_settings(use_empty=True)

    # Make sure we are in OBJECT mode in a fresh context
    if bpy.context.mode != "OBJECT":
        bpy.ops.object.mode_set(mode="OBJECT")

    coll = ensure_collection("Jersey")

    # Materials
    mat_main = make_material("mat_jersey_main", MAIN_COLOR_HEX, roughness=0.7, metallic=0.0)
    mat_back = make_material("mat_jersey_back", MAIN_COLOR_HEX, roughness=0.7, metallic=0.0)

    # Geometry
    torso = build_torso()
    sleeve_l = build_sleeve("jersey_sleeve_left", -1)
    sleeve_r = build_sleeve("jersey_sleeve_right", +1)

    for o in (torso, sleeve_l, sleeve_r):
        link_to_collection(o, coll)

    # Apply modifiers (we want to control tri count and UV before export)
    apply_all_modifiers(torso)
    apply_all_modifiers(sleeve_l)
    apply_all_modifiers(sleeve_r)

    # Materials assignment after applying modifiers (slot indices preserved by Solidify)
    assign_materials(torso, mat_main, mat_back)
    assign_single_material(sleeve_l, mat_main)
    assign_single_material(sleeve_r, mat_main)

    # Smart UV
    smart_uv(torso)
    smart_uv(sleeve_l)
    smart_uv(sleeve_r)

    # Tri count check + decimate if necessary
    total_tris = tri_count(torso) + tri_count(sleeve_l) + tri_count(sleeve_r)
    print(f"[jersey] tri count before decimate: {total_tris}")

    if total_tris > MAX_TRIS:
        ratio = float(TARGET_TRIS) / float(total_tris)
        for o in (torso, sleeve_l, sleeve_r):
            select_only(o)
            dec = o.modifiers.new("Decimate", "DECIMATE")
            dec.ratio = max(0.1, ratio)
            bpy.ops.object.modifier_apply(modifier=dec.name)
        total_tris = tri_count(torso) + tri_count(sleeve_l) + tri_count(sleeve_r)
        print(f"[jersey] tri count after decimate: {total_tris}")

    print(f"[jersey] FINAL TRI COUNT: {total_tris}")

    # Set torso origin to its center (center of torso geometry)
    select_only(torso)
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="MEDIAN")

    # Select all jersey meshes for export
    bpy.ops.object.select_all(action="DESELECT")
    for o in (torso, sleeve_l, sleeve_r):
        o.select_set(True)
    bpy.context.view_layer.objects.active = torso

    # Export GLB - try with Draco first, fallback if codec is missing.
    export_kwargs_common = dict(
        filepath=output_path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_image_format="NONE",
    )

    try:
        bpy.ops.export_scene.gltf(
            **export_kwargs_common,
            export_draco_mesh_compression_enable=True,
            export_draco_mesh_compression_level=6,
        )
        print("[jersey] exported with Draco level 6")
    except Exception as exc:
        print(f"[jersey] Draco export failed ({exc}); retrying without Draco")
        bpy.ops.export_scene.gltf(
            **export_kwargs_common,
            export_draco_mesh_compression_enable=False,
        )
        print("[jersey] exported without Draco")

    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        print(f"[jersey] wrote {output_path} ({size} bytes, {size/1024:.1f} KB)")
        if size > 2 * 1024 * 1024:
            print(f"[jersey] WARNING: file size exceeds 2 MB ({size} bytes)")
    else:
        print(f"[jersey] ERROR: expected file not found at {output_path}")
        sys.exit(1)


if __name__ == "__main__":
    main()
