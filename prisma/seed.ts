import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';

const prisma = new PrismaClient();
const cmd = promisify(exec);
const productFile = join(process.cwd(), 'tmp', 'products.json');

async function main() {
  await cmd('node ./dist/scripts/generate-products.js');

  const data = await readFile(productFile, 'utf8');
  const products: any[] = JSON.parse(data);

  for (const p of products) {
    if (!p) {
      console.log('Product is null');
      continue;
    }
    const product = await prisma.product.create({ data: p });

    console.log(
      '[%s] - %s [%s] [%s]',
      new Date(),
      'Product created',
      product.id,
      product.name,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
