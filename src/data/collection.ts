export type CollectionProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: "Signature Collection" | "Everyday Classics";
};

export const signatureCollection: CollectionProduct[] = [
  {
    id: 1,
    name: "Heritage Chronograph",
    image: "/images/products/heritage-chronograph.jpg",
    price: 18500,
    description:
      "A refined chronograph with a warm leather strap and a dial built for detail.",
    category: "Signature Collection",
  },
  {
    id: 2,
    name: "Midnight Steel Diver",
    image: "/images/products/midnight-steel-diver.jpg",
    price: 21000,
    description:
      "A bold steel diver with a precision bezel, built for everyday confidence.",
    category: "Signature Collection",
  },
  {
    id: 3,
    name: "Executive Steel Elite",
    image: "/images/products/executive-steel-elite.jpg",
    price: 19800,
    description:
      "A commanding steel bracelet watch designed for the boardroom and beyond.",
    category: "Signature Collection",
  },
];

export const everydayClassics: CollectionProduct[] = [
  {
    id: 4,
    name: "Minimalist Canvas Black",
    image: "/images/products/minimalist-canvas-black.jpg",
    price: 8500,
    description: "A clean minimalist face on a durable canvas strap for daily wear.",
    category: "Everyday Classics",
  },
  {
    id: 5,
    name: "Trail Leather Tan",
    image: "/images/products/trail-leather-tan.jpg",
    price: 8000,
    description: "A rugged tan leather watch built for outdoor days and easy style.",
    category: "Everyday Classics",
  },
  {
    id: 6,
    name: "Rose Gold Classic",
    image: "/images/products/rose-gold-classic.jpg",
    price: 9200,
    description: "An elegant rose gold case with a crisp white dial for everyday grace.",
    category: "Everyday Classics",
  },
];
