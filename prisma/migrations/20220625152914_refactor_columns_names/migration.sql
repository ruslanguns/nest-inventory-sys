/*
  Warnings:

  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `idType` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `idType` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `sales_orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sales_orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sales_orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sales_orders` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_number` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_type` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_number` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_type` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `sales_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `sales_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sales_orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_products" ("id", "sku", "sn") SELECT "id", "sku", "sn" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_suppliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_number" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_suppliers" ("id", "name") SELECT "id", "name" FROM "suppliers";
DROP TABLE "suppliers";
ALTER TABLE "new_suppliers" RENAME TO "suppliers";
CREATE TABLE "new_purchase_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qty" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "purchase_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchase_orders_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchase_orders" ("id", "qty") SELECT "id", "qty" FROM "purchase_orders";
DROP TABLE "purchase_orders";
ALTER TABLE "new_purchase_orders" RENAME TO "purchase_orders";
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_number" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_clients" ("id", "name") SELECT "id", "name" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE TABLE "new_sales_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qty" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "client_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "sales_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sales_orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sales_orders" ("id", "qty") SELECT "id", "qty" FROM "sales_orders";
DROP TABLE "sales_orders";
ALTER TABLE "new_sales_orders" RENAME TO "sales_orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
