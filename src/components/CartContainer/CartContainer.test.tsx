import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "@src/entities/app";

import { CartContainer } from "@src/components/CartContainer/CartContainer";

import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";

import { useCartContext } from "@src/hooks/useCartContext";

import { phone, phones } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
  firstPhone: Phone;
  mockDispatch: jest.Mock;
};

const renderComponent = (cartItems = phones): RenderComponent => {
  const mockDispatch = jest.fn();
  const { total, amount } = getTotalAndAmount(cartItems);

  (useCartContext as jest.Mock).mockReturnValue({
    state: {
      cart: cartItems,
      amount: amount,
      total: total,
      isLoading: false,
    },
    dispatch: mockDispatch,
  });

  const { container } = render(<CartContainer />);

  return {
    container: container,
    firstPhone: phone,
    mockDispatch: mockDispatch,
  };
};

jest.mock("@src/hooks/useCartContext", () => ({
  useCartContext: jest.fn(),
}));

describe("CartContainer.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It is expected that touching the clean cart button will render the message that the cart is empty.", async () => {
      const { mockDispatch } = renderComponent();

      const clearCartButton = await screen.findByRole("button", {
        name: /clear cart/i,
      });

      expect(clearCartButton).toBeInTheDocument();

      await user.click(clearCartButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "CLEAR_CART",
      });
    });

    test("It is expected to show empty cart message when cart is empty", () => {
      renderComponent([]);

      const headingEmptyElement = screen.getByRole("heading", {
        name: /Is currently empty/i,
      });

      expect(headingEmptyElement).toBeInTheDocument();
    });

    test("Full cellular pricing expected to be rendered", async () => {
      renderComponent();

      const { total } = getTotalAndAmount(phones);

      const totalPriceElement = await screen.findByText(
        `$ ${total.toFixed(2)}`
      );

      expect(totalPriceElement).toBeInTheDocument();
      expect(total).toBe(1899.96);
    });

    test("It is expected that all the phones will be rendered.", async () => {
      const { container, firstPhone } = renderComponent();

      await screen.findByRole("heading", {
        name: firstPhone.title,
      });

      const phoneElements = container.querySelectorAll<HTMLDivElement>(".item");

      expect(phoneElements).toHaveLength(phones.length);
    });

    test("You must change the total to be paid if you add or reduce the number of cell phones to be purchased.", async () => {
      const { container, firstPhone, mockDispatch } = renderComponent();

      await screen.findByRole("heading", {
        name: firstPhone.title,
      });

      const phoneElements = container.querySelectorAll<HTMLDivElement>(".item");

      expect(phoneElements).toHaveLength(phones.length);

      const firstPhoneElement = phoneElements[0];

      const firstPhoneElementIncreaseButton =
        firstPhoneElement.querySelector<HTMLButtonElement>(
          "[aria-label='increase phone']"
        );
      const firstPhoneElementDecreaseButton =
        firstPhoneElement.querySelector<HTMLButtonElement>(
          "[aria-label='decrease phone']"
        );

      expect(firstPhoneElement).toBeInTheDocument();
      expect(firstPhoneElementIncreaseButton).toBeInTheDocument();
      expect(firstPhoneElementDecreaseButton).toBeInTheDocument();

      await user.click(firstPhoneElementIncreaseButton!);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "INCREASE_ITEM",
        payload: { id: firstPhone.id },
      });

      await user.click(firstPhoneElementDecreaseButton!);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "DECREASE_ITEM",
        payload: { id: firstPhone.id },
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  });
});
