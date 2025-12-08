-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "minPurchase" REAL,
    "maxDiscount" REAL,
    "usageLimit" INTEGER,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startsAt" DATETIME,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- CreateIndex
CREATE INDEX "PromoCode_code_idx" ON "PromoCode"("code");

-- CreateIndex
CREATE INDEX "PromoCode_active_idx" ON "PromoCode"("active");

-- CreateIndex
CREATE INDEX "PromoCode_expiresAt_idx" ON "PromoCode"("expiresAt");
