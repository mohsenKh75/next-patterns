export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

/** Static product catalog (served from /public, no external API). */
export const FAKE_PRODS: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 100,
    image: "/mosi.jpeg",
    category: "Category 1",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    price: 200,
    image: "/mosi.jpeg",
    category: "Category 2",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description 3",
    price: 300,
    image: "/mosi.jpeg",
    category: "Category 3",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 4,
    title: "Product 4",
    description: "Description 4",
    price: 400,
    image: "/mosi.jpeg",
    category: "Category 4",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 5,
    title: "Product 5",
    description: "Description 5",
    price: 500,
    image: "/mosi.jpeg",
    category: "Category 5",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 6,
    title: "Product 6",
    description: "Description 6",
    price: 600,
    image: "/mosi.jpeg",
    category: "Category 6",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 7,
    title: "Product 7",
    description: "Description 7",
    price: 700,
    image: "/mosi.jpeg",
    category: "Category 7",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 8,
    title: "Product 8",
    description: "Description 8",
    price: 800,
    image: "/mosi.jpeg",
    category: "Category 8",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 9,
    title: "Product 9",
    description: "Description 9",
    price: 900,
    image: "/mosi.jpeg",
    category: "Category 9",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 10,
    title: "Product 10",
    description: "Description 10",
    price: 1000,
    image: "/mosi.jpeg",
    category: "Category 10",
    rating: { rate: 4.5, count: 100 },
  },
];
