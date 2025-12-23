export interface Product {
  id: number;
  productName: string;
  images?: { id: number; images: string }[];
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  productInMyCart: boolean;
  categoryId: number;
  categoryName: string;
  productInfoFromCart: any;
}
