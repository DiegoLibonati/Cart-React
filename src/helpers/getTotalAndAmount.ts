import { Phone } from "@src/entities/app";
import { GetTotalAndAmount } from "@src/entities/helpers";

export const getTotalAndAmount = (arr: Phone[]): GetTotalAndAmount => {
  return arr.reduce(
    (acc, phone) => {
      acc.total += parseFloat(String(Number(phone.price) * phone.amount));
      acc.amount += phone.amount;
      return acc;
    },
    {
      total: 0,
      amount: 0,
    }
  );
};
