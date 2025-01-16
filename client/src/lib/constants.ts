export const SITE_NAME = 'lottusse';

export const categories = ['Shoes', 'Bags and Backpacks', 'Clothing', 'Belt'];

export type Product = {
  id: number;
  name: string;
  title?: string;
  imageLink?: string;
  tags: string[];
  price: number;
};
