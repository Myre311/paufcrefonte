import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Staff & Dirigeants — Pau Football Club',
  description: 'Direction et staff sportif du Pau Football Club.',
};

const DIRECTION_STATIC = [
  {
    nom: 'Bernard Laporte-Fray',
    role: 'Président',
    photo: '/images/staff/bernard-laporte-fray.png',
  },
  {
    nom: 'Luis De Sousa',
    role: 'Directeur Sportif',
    photo: '/images/staff/luis-de-sousa.png',
  },
  {
    nom: 'Thierry Debès',
    role: 'Entraîneur Principal',
    photo: '/images/staff/thierry-debes.png',
  },
];

function StaffCard({ person }) {
  const { firstName, lastName, staffTitle, photoUrl } = person;
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-pau-primary mb-4">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
        )}
      </div>
      <p className="font-sans font-semibold text-sm uppercase tracking-wider text-pau-night">
        {firstName} {lastName}
      </p>
      {staffTitle && (
        <p className="text-xs text-pau-night/50 mt-1">{staffTitle}</p>
      )}
    </div>
  );
}

function StaticCard({ nom, role, photo }) {
  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[3/4] overflow-hidden bg-pau-primary mb-4">
        {photo ? (
          <Image
            src={photo}
            alt={`${nom}, ${role}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-pau-primary flex items-center justify-center">
            <span className="font-display text-3xl text-white/15">
              {nom?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(4,9,29,0.55) 0%, rgba(4,9,29,0.05) 50%, rgba(4,9,29,0) 100%)',
          }}
          aria-hidden="true"
        />
      </div>
      <p className="font-sans font-semibold text-sm uppercase tracking-wider text-pau-night">
        {nom}
      </p>
      <p className="text-xs text-pau-night/50 mt-1">{role}</p>
    </div>
  );
}

export default async function StaffPage() {
  const staffMembers = await prisma.player
    .findMany({
      where: { active: true, role: { in: ['staff', 'coach'] } },
      orderBy: { displayOrder: 'asc' },
    })
    .catch(() => []);

  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-club.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            PAU FC
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            STAFF &amp; DIRIGEANTS
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl uppercase text-pau-night mb-8">DIRECTION</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
            {DIRECTION_STATIC.map(({ nom, role, photo }) => (
              <StaticCard key={role} nom={nom} role={role} photo={photo} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl uppercase text-pau-night mb-8">
            STAFF SPORTIF
          </h2>
          {staffMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {staffMembers.map((person) => (
                <StaffCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { nom: 'Thierry Debès', role: 'Entraîneur principal', photo: '/images/staff/thierry-debes.png' },
                { nom: 'Adjoint sportif', role: 'Entraîneur adjoint', photo: '/images/hero-academy.jpg' },
                { nom: 'Préparation physique', role: 'Préparateur physique', photo: '/images/hero-academy-stages.jpg' },
                { nom: 'Cellule médicale', role: 'Service médical', photo: '/images/hero-club.jpg' },
              ].map(({ nom, role, photo }) => (
                <StaticCard key={role} nom={nom} role={role} photo={photo} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
