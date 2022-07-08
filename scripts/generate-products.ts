import axios from 'axios';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

(async () => {
  try {
    const tmpDir = join(process.cwd(), 'tmp');
    const productsFile = join(tmpDir, './products.json');

    console.log('Fetching products... 🙌');

    // Fetching products from dummyjson website
    const apiUrl = 'https://dummyjson.com/products?limit=100';
    const response = await axios.get<ProductResponse>(apiUrl);
    const data = response.data?.products ?? [];

    if (!data.length) {
      throw new Error('No products has been fetched 😵‍💫');
    }

    console.log('Products fetched successfully 😎');

    const products = data.map(
      ({
        title,
        stock,
        brand,
        category,
        // description,
        // id,
        // price,
        // discountPercentage,
        // rating,
        // thumbnail,
        // images,
      }) => ({
        name: title,
        stock,
        sku: createSKU(title, brand, category),
        sn: createSN(),
      }),
    );

    // Creating tmp directory
    !existsSync(tmpDir) && mkdirSync(tmpDir);

    // Writing product data to file
    writeFileSync(productsFile, JSON.stringify(products));

    console.log('Products created successfully 🎉');
  } catch (error) {
    throw new Error(error.message + ' 🤔');
  }
})();

function createSKU(...args: Array<string | number>): string {
  if (args.length === 0) {
    throw new Error('No arguments passed');
  }

  if (args.length < 3) {
    throw new Error('You need to pass at least 3 arguments');
  }

  args.push(Math.floor(Math.random() * 100));

  return args
    .map((str) => str.toString().substring(0, 2))
    .join('')
    .toUpperCase();
}

function createSN() {
  return Math.random().toString(36).slice(2);
}
