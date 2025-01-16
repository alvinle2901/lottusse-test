import { Product } from './constants';

export const getPriceRangeFromProducts = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 0];

  const prices = products.map((product) => product.price);

  return [Math.min(...prices), Math.max(...prices)];
};

export const filterProductsByPriceRange = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
) => {
  return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
};
