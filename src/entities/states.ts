import { Phone } from "@src/entities/app";

export type CartState = {
  loading: boolean;
  cart: Phone[];
  total: number;
  amount: number;
};
