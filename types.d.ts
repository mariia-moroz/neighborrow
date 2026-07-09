interface Item {
  id: string;
  title: string;
  category: string;
  rating: number;
  totalItems: number;
  availableItems: number;
  available: boolean;
  summary: string;
  description: string;
  image: string;
  condition: string;
  included: string;
  brand: string;
  borrowDuration: number;
  createdAt: Date | null;
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
