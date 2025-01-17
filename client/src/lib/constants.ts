export const SITE_NAME = 'lottusse';

export const categories = ['Shoes', 'Bags and Backpacks', 'Clothing', 'Belt'];

export const menuItems = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Products" },
  { href: "/", label: "About Us" },
  { href: "/", label: "Contact Us" },
];

export type Product = {
  id: number;
  name: string;
  title?: string;
  imageLink?: string;
  tags: string[];
  price: number;
};
