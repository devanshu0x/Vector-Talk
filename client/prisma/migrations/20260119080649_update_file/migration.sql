/*
  Warnings:

  - Added the required column `status` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('UPLOADED', 'QUEUED', 'PROCESSING', 'EMBEDDING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "FileStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
