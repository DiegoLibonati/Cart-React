import { Phone } from "../entities/entities";

type GetTotalAndAmount = {
  total: number;
  amount: number;
};

export const getTotalAndAmount = (arr: Phone[]): GetTotalAndAmount => {
  return arr.reduce(
    (acc, phone) => {
      acc.total += parseFloat((Number(phone.price) * phone.amount).toFixed(2));
      acc.amount += phone.amount;
      return acc;
    },
    {
      total: 0,
      amount: 0,
    }
  );
};