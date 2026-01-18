/*
  Warnings:

  - You are about to drop the column `chatId` on the `File` table. All the data in the column will be lost.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_chatId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "chatId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ChatFile" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "ChatFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatFile" ADD CONSTRAINT "ChatFile_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatFile" ADD CONSTRAINT "ChatFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
