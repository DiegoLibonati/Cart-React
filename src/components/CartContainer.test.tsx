import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "../entities/entities";

import { CartContainer } from "./CartContainer";

import { getTotalAndAmount } from "../helpers/getTotalAndAmount";
import { AppProvider } from "../context/context";
import { createServer } from "../test/server";

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

const renderComponent = (): {
  container: HTMLElement;
  firstPhone: Phone;
} => {
  const firstPhone = PHONES[0];
  const { container } = render(
    <AppProvider>
      <CartContainer />
    </AppProvider>
  );

  return {
    container: container,
    firstPhone: firstPhone,
  };
};

// TODO: TEST # Cambie el Total dependiendo si sube o baja

test("It is expected that touching the clean cart button will render the message that the cart is empty.", async () => {
  renderComponent();

  const clearCartButton = await screen.findByRole("button", {
    name: /clear cart/i,
  });

  expect(clearCartButton).toBeInTheDocument();

  await user.click(clearCartButton);

  const headingEmptyElement = await screen.findByRole("heading", {
    name: /Is currently empty/i,
  });

  expect(headingEmptyElement).toBeInTheDocument();
});

test("Full cellular pricing expected to be rendered", async () => {
  renderComponent();

  const { total } = getTotalAndAmount(PHONES);

  const totalPriceElement = await screen.findByText(`$ ${total}`);

  expect(totalPriceElement).toBeInTheDocument();
  expect(total).toBe(1899.96);
});

test("It is expected that all the phones will be rendered.", async () => {
  const { container, firstPhone } = renderComponent();

  await screen.findByRole("heading", {
    name: firstPhone.title,
  });

  // eslint-disable-next-line
  const phoneElements = container.querySelectorAll(".cart_item");

  expect(phoneElements).toHaveLength(PHONES.length);
});

test("You must change the total to be paid if you add or reduce the number of cell phones to be purchased.", async () => {
  const { container, firstPhone } = renderComponent();

  await screen.findByRole("heading", {
    name: firstPhone.title,
  });

  // eslint-disable-next-line
  const phoneElements = container.querySelectorAll(".cart_item");

  expect(phoneElements).toHaveLength(PHONES.length);

  const firstPhoneElement = phoneElements[0];
  // eslint-disable-next-line
  const firstPhoneElementIncreaseButton = firstPhoneElement.querySelector(
    "[aria-label='increase phone']"
  );
  // eslint-disable-next-line
  const firstPhoneElementDecreaseButton = firstPhoneElement.querySelector(
    "[aria-label='decrease phone']"
  );

  expect(firstPhoneElement).toBeInTheDocument();
  expect(firstPhoneElementIncreaseButton).toBeInTheDocument();
  expect(firstPhoneElementDecreaseButton).toBeInTheDocument();

  await user.click(firstPhoneElementIncreaseButton!);

  const { total } = getTotalAndAmount(PHONES);
  const totalUpdatedIncrease = total + firstPhone.price;

  const totalElementIncrease = screen.getByText(`$ ${totalUpdatedIncrease}`);

  expect(totalElementIncrease).toBeInTheDocument();

  await user.click(firstPhoneElementDecreaseButton!);

  const totalUpdatedDecrease = (
    totalUpdatedIncrease - firstPhone.price
  ).toFixed(2);

  const totalElementDecrease = screen.getByText(`$ ${totalUpdatedDecrease}`);

  expect(totalElementDecrease).toBeInTheDocument();
});
