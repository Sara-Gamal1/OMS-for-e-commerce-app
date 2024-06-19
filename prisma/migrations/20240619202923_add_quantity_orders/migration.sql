-- AlterEnum
ALTER TYPE "status" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "productsOnOrders" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
