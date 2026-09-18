

export interface Item {
  id: number;
  name: string;
  detail?: {
    id: number;
    description: string;
  };
  category?: {
    id: number;
    name: string;
  };
  images?: {
    id: number;
    url: string;
  }[];
  tags?: {
    id: number;
    name: string;
  }[];
  relatedItems?: {
    id: number;
    name: string;
  }[];
}

export interface ItemOption {
  id: number;
  name: string;
}
