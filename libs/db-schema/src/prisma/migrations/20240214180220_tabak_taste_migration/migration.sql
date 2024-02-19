-- CreateTable
CREATE TABLE "Producer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tobacco" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tastes" TEXT[],
    "producerId" INTEGER NOT NULL,
    "amount" INTEGER,
    "unit" TEXT,
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "ean" TEXT,

    CONSTRAINT "Tobacco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_key" ON "Producer"("name");

-- AddForeignKey
ALTER TABLE "Tobacco" ADD CONSTRAINT "Tobacco_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
