/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "author" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "handle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_handle_key" ON "users"("handle");
