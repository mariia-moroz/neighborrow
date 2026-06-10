interface Item {
  id: number;
  title: string;
  category: string;
  rating: number;
  total_items: number;
  available_items: number;
  summary: string;
  image: string;
  available?: boolean;
}
