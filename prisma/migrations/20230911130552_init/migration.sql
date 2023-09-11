-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Chapter_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dua" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapter_id" TEXT NOT NULL,
    "arabic" TEXT NOT NULL,
    "arabic_diacless" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "top" TEXT NOT NULL,
    "translations" TEXT NOT NULL,
    "transliteration" TEXT NOT NULL,
    CONSTRAINT "Dua_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
