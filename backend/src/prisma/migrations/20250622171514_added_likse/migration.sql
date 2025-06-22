-- CreateTable
CREATE TABLE "IdeasToLikes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,

    CONSTRAINT "IdeasToLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdeasToLikes_ideaId_userId_key" ON "IdeasToLikes"("ideaId", "userId");

-- AddForeignKey
ALTER TABLE "IdeasToLikes" ADD CONSTRAINT "IdeasToLikes_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeasToLikes" ADD CONSTRAINT "IdeasToLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
