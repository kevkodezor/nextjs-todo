-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rol" TEXT[] DEFAULT ARRAY['user']::TEXT[];
