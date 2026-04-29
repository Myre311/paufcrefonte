import Image from 'next/image';

export default function PartnerCard({ name, logoUrl, websiteUrl, size = 'md' }) {
  const paddingClass = size === 'lg' ? 'p-10' : size === 'sm' ? 'p-4' : 'p-6';

  const card = (
    <div
      className={`aspect-[3/2] bg-white border border-pau-night/10 ${paddingClass} flex items-center justify-center hover:bg-white/95 transition-colors duration-200`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={name}
          width={240}
          height={120}
          className="object-contain w-full h-full"
        />
      ) : (
        <span className="text-pau-night text-sm font-sans font-semibold uppercase tracking-wide text-center">
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
