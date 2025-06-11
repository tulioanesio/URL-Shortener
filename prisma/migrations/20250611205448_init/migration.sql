/*
  Warnings:

  - The `expireAt` column on the `ShortUrl` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ShortUrl" DROP COLUMN "expireAt",
ADD COLUMN     "expireAt" INTEGER;
