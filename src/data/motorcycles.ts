export type Motorcycle = {
  id: string;
  name: string;
  category: string;
  engine: string;
  power: string;
  image: string;
  model: string;
};

export const motorcycles: Motorcycle[] = [
  {
    id: "cbr650r",
    name: "Honda CBR650R",
    category: "Sport",
    engine: "649cc",
    power: "94 HP",
    image: "/images/cbr650r.jpg",
    model: "/models/cbr650r.glb",
  },
  {
    id: "africa-twin",
    name: "Honda Africa Twin",
    category: "Adventure",
    engine: "1084cc",
    power: "102 HP",
    image: "/images/africa-twin.jpg",
    model: "/models/africa-twin.glb",
  },
];