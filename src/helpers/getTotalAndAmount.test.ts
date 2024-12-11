import { Phone } from "../entities/entities";

import { getTotalAndAmount } from "./getTotalAndAmount";

test("It must return an object with the total and number of cell phones entered.", () => {
  const phones: Phone[] = [
    {
      id: 1,
      title: "Samsung Galaxy S7",
      price: 599.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",
      amount: 1,
    },
    {
      id: 2,
      title: "Google pixel ",
      price: 499.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",
      amount: 1,
    },
  ];

  const object = getTotalAndAmount(phones);

  expect(object.total).toEqual(1099.98);
  expect(object.amount).toEqual(2);
});
