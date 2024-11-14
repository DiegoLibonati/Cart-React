import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "../../entities/entities";

import { CartItem } from "./CartItem";

import { AppProvider } from "../../context/context";
import { createServer } from "../../test/msw/server";

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

const renderComponent = async (): Promise<{
  container: HTMLElement;
  phone: Phone;
}> => {
  const { container } = render(
    <AppProvider>
      <CartItem id={phone.id} />
    </AppProvider>
  );

  await screen.findByRole("heading", {
    name: phone.title,
  });

  return {
    container: container,
    phone: phone,
  };
};

// const renderComponentWithContextMocked = async (): Promise<{
//   container: HTMLElement;
//   phone: Phone;
// }> => {
//   const { amount, total } = getTotalAndAmount(PHONES);

//   const { container } = render(
//     <AppContext.Provider
//       value={{
//         amount: amount,
//         total: total,
//         cart: PHONES,
//         loading: false,
//         clearCart: jest.fn(),
//         clearItem: mockClearItem,
//         decreaseItem: jest.fn(),
//         displayItems: jest.fn(),
//         increaseItem: jest.fn(),
//         setLoading: jest.fn(),
//       }}
//     >
//       <CartItem id={phone.id} />
//     </AppContext.Provider>
//   );

//   await screen.findByRole("heading", {
//     name: phone.title,
//   });

//   return {
//     container: container,
//     phone: phone,
//   };
// };

test("It is expected to render the title, price, image and quantity.", async () => {
  const { phone } = await renderComponent();

  const titleElement = screen.getByRole("heading", {
    name: phone.title,
  });
  const priceElement = screen.getByText(`$${phone.price}`);
  const imgElement = screen.getByAltText(phone.title);
  const amountElement = screen.getByText(phone.amount);

  expect(titleElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  expect(amountElement).toBeInTheDocument();

  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute("src", phone.img);
  expect(imgElement).toHaveAttribute("alt", phone.title);
});

test("Remove, add and remove product buttons are expected to be rendered.", async () => {
  await renderComponent();

  const removeButton = screen.getByRole("button", {
    name: /remove/i,
  });
  const increaseButton = screen.getByRole("button", {
    name: /increase phone/i,
  });
  const decreaseButton = screen.getByRole("button", {
    name: /decrease phone/i,
  });

  expect(removeButton).toBeInTheDocument();
  expect(increaseButton).toBeInTheDocument();
  expect(decreaseButton).toBeInTheDocument();
});

test("It seeks to increase the amount of the cell when the increase amount button is touched.", async () => {
  const { phone } = await renderComponent();

  const increaseButton = screen.getByRole("button", {
    name: /increase phone/i,
  });

  expect(increaseButton).toBeInTheDocument();

  await user.click(increaseButton);

  const amountElement = await screen.findByText(String(phone.amount + 1));

  expect(amountElement).toBeInTheDocument();
});

test("It is intended to decrease the amount of the cell phone when the decrease amount button is touched.", async () => {
  const { phone } = await renderComponent();

  const decreaseButton = screen.getByRole("button", {
    name: /decrease phone/i,
  });

  expect(decreaseButton).toBeInTheDocument();

  await user.click(decreaseButton);

  const quantity = phone.amount - 1;

  if (!quantity) {
    const amountElement = screen.queryByText(String(quantity));

    expect(amountElement).not.toBeInTheDocument();

    return;
  }

  const amountElement = await screen.findByText(String(quantity));

  expect(amountElement).toBeInTheDocument();
});

test("Cell phone disappear when you tap on the remove button.", async () => {
  const { phone } = await renderComponent();

  const removeButton = screen.getByRole("button", {
    name: /remove/i,
  });

  expect(removeButton).toBeInTheDocument();

  await user.click(removeButton);

  const headingElement = screen.queryByText(phone.title);

  expect(headingElement).not.toBeInTheDocument();
});
