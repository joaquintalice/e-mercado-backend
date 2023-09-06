-- CreateTable
CREATE TABLE "productCommets" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "score" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productCommets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productCommets" ADD CONSTRAINT "productCommets_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
