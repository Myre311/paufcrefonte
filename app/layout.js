import './globals.css';
import { gfsDidot, inter } from '../lib/fonts';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Pau Football Club — Site officiel',
  description:
    'Site officiel du Pau Football Club. Billetterie, boutique, calendrier, équipe, actualités.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${gfsDidot.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans bg-pau-white text-pau-night antialiased min-h-screen overflow-x-hidden">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
