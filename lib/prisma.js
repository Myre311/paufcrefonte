import { PrismaClient } from '@prisma/client';

// Singleton : en dev, le hot-reload de Next ré-importe ce module à chaque
// requête, ce qui multiplierait les connexions Postgres et saturerait le pool.
// On stocke l'instance sur globalThis pour la réutiliser entre les reloads.

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__fcpauPrisma ??
  new PrismaClient({
    log: process.env.APP_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__fcpauPrisma = prisma;
}
