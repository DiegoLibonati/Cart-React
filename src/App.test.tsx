import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "./entities/entities";

import { App } from "./App";

import { AppProvider } from "./context/context";
import { createServer } from "./test/server";
import { getTotalAndAmount } from "./helpers/getTotalAndAmount";

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
const phone = PHONES[0];

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
  const { container } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  return {
    container: container,
    firstPhone: phone,
  };
};

test("If you change the quantity of a cell phone, you must change the quantity in the navbar.", async () => {
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

  // eslint-disable-next-line
  const amountElementNavBar = container.querySelector(".amount-container > p");

  expect(amountElementNavBar).toBeInTheDocument();

  await user.click(firstPhoneElementIncreaseButton!);

  const { amount } = getTotalAndAmount(PHONES);
  const amountIncreased = amount + 1;

  expect(amountElementNavBar).toHaveTextContent(String(amountIncreased));

  await user.click(firstPhoneElementDecreaseButton!);

  const amountDecreased = amountIncreased - 1;

  expect(amountElementNavBar).toHaveTextContent(String(amountDecreased));
});

test("If it is loading it should render the loading text.", async () => {
  const { firstPhone } = renderComponent();

  const loadingElement = screen.getByRole("heading", {
    name: /loading/i,
  });

  expect(loadingElement).toBeInTheDocument();

  await screen.findByRole("heading", {
    name: firstPhone.title,
  });

  expect(loadingElement).not.toBeInTheDocument();
});
