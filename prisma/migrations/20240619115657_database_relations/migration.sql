/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "productsOnCarts" (
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "productsOnCarts_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateTable
CREATE TABLE "productsOnOrders" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "productsOnOrders_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_userId_key" ON "cart"("userId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOnCarts" ADD CONSTRAINT "productsOnCarts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOnCarts" ADD CONSTRAINT "productsOnCarts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOnOrders" ADD CONSTRAINT "productsOnOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsOnOrders" ADD CONSTRAINT "productsOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
