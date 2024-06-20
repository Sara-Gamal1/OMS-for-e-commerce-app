-- AlterTable
ALTER TABLE "order" ADD COLUMN     "couponId" INTEGER;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("couponId") ON DELETE SET NULL ON UPDATE CASCADE;
