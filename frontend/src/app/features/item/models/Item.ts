

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

export interface ItemRequest {
  name: string;
  description: string;
  categoryId: number;
  tagIds: number[];
  relatedItemIds: number[];
}

export interface ItemOption {
  id: number;
  name: string;
}
