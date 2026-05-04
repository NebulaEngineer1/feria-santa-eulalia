export type Category =
  | "verduras"
  | "frutas"
  | "lacteos"
  | "panaderia"
  | "huevos"
  | "hierbas"
  | "granos";

export type Unit = "kg" | "lb" | "unidad" | "manojo" | "docena" | "litro" | "paquete";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  supplier: string;
  supplierLocation: string;
  price: number; // en colones (CRC)
  unit: Unit;
  image: string;
  stock: number;
  organic?: boolean;
  bestSeller?: boolean;
}

export interface Combo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  items: { name: string; qty: string }[];
  price: number;
  originalPrice: number;
  serves: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryType = "domicilio" | "retiro";
export type PaymentMethod = "sinpe" | "tarjeta" | "efectivo";
export type ZoneId = 1 | 2 | 3;

export interface Zone {
  id: ZoneId;
  name: string;
  fee: number;
  schedule: string[];
}

export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  zone: ZoneId | "";
  deliveryType: DeliveryType;
  schedule: string;
  paymentMethod: PaymentMethod;
  notes: string;
}
