import Image from 'next/image';

// Filter chain that pushes any color logo toward the gold (#CBA74D) palette,
// then the card hover state restores the original colors.
const GOLD_FILTER =
  'brightness(0) saturate(100%) invert(70%) sepia(35%) saturate(580%) hue-rotate(8deg) brightness(95%) contrast(88%)';

export default function PartnerCard({ name, logoUrl, websiteUrl, size = 'md' }) {
  const paddingClass = size === 'lg' ? 'p-10' : size === 'sm' ? 'p-4' : 'p-6';

  const card = (
    <div
      className={`group aspect-[3/2] bg-pau-night border border-pau-gold/20 ${paddingClass} flex items-center justify-center hover:border-pau-gold/60 transition-colors duration-200`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={name}
          width={240}
          height={120}
          className="object-contain w-full h-full transition duration-300 group-hover:[filter:none]"
          style={{ filter: GOLD_FILTER }}
        />
      ) : (
        <span className="text-pau-gold text-sm font-sans font-semibold uppercase tracking-wide text-center">
          {name}
        </span>
      )}
    </div>
  );

  if (websiteUrl) {
    return (
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Site officiel de ${name}`}
      >
        {card}
      </a>
    );
  }

  return card;
}
