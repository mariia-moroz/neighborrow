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

interface BorrowItemParams {
  itemId: string;
  userId: string;
}

interface BorrowedItem {
  id: string;
  userId: string;
  itemId: string;
  borrowDate: Date | null;
  dueDate: Date | null;
  returnDate: Date | null;
  status: string;
  createdAt: Date | null;
  item: {
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
  };
}

interface BorrowRequest {
  id: string;
  userId: string;
  itemId: string;
  borrowDate: Date | null;
  dueDate: Date | null;
  returnDate: Date | null;
  status: string;
  createdAt: Date | null;
  item: {
    image: string;
    title: string;
  };
  user: {
    fullName: string;
    email: string;
  };
}
