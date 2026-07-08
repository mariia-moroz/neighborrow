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
  borrow_duration: number;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  address: string;
  idConfirmation: string;
}

interface ItemParams {
  title: string;
  category: string;
  rating: number;
  totalItems: number;
  summary: string;
  description: string;
  image: string;
  condition: string;
  included: string;
  brand: string;
  borrowDuration: number;
}
