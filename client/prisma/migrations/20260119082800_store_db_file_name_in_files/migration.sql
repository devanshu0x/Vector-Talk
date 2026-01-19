/*
  Warnings:

  - A unique constraint covering the columns `[fileNameInDb]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileNameInDb` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileNameInDb" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_fileNameInDb_key" ON "File"("fileNameInDb");
