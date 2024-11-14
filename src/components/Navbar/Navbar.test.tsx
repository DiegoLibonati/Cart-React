import { screen, render } from "@testing-library/react";

import { Navbar } from "./Navbar";

import { AppProvider } from "../../context/context";
import { createServer } from "../../test/msw/server";
import { getTotalAndAmount } from "../../helpers/getTotalAndAmount";

const PHONES = [
  {
    id: 1,
    title: "Samsung Galaxy S8",
    price: 399.99,
    img: "https://www.course-api.com/images/cart/phone-1.png",
    amount: 1,
  },
  {
    id: 2,
    title: "google pixel",
    price: 499.99,
    img: "https://www.course-api.com/images/cart/phone-2.png",
    amount: 3,
  },
];

createServer([
  {
    path: "/react-useReducer-cart-project",
    method: "get",
    res: () => {
      return PHONES;
    },
  },
]);

test("Rendering of the number of telephones in the cart", async () => {
  render(
    <AppProvider>
      <Navbar />
    </AppProvider>
  );

  const { amount: amountFromPhones } = getTotalAndAmount(PHONES);

  const amount = await screen.findByText(new RegExp(String(amountFromPhones)));

  expect(amount).toBeInTheDocument();
});

test("Rendering of the number of telephones in the cart through an initialValue", async () => {
  const phone = PHONES[0];

  render(
    <AppProvider initialCart={[PHONES[0]]}>
      <Navbar />
    </AppProvider>
  );

  const amountPhone = phone.amount;
  const amountElement = screen.getByText(new RegExp(String(amountPhone)));

  expect(amountElement).toBeInTheDocument();
});
