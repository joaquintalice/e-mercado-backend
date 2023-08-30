-- CreateTable
CREATE TABLE "relatedProducts" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER NOT NULL,
    "prodName" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "relatedProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "relatedProducts" ADD CONSTRAINT "relatedProducts_prodName_fkey" FOREIGN KEY ("prodName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
