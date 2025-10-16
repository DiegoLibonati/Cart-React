import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "@src/entities/app";

import { CartItem } from "@src/components/CartItem/CartItem";

import { useCartContext } from "@src/hooks/useCartContext";

import { phone } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
  phone: Phone;
  mockDispatch: jest.Mock;
};

const renderComponent = async (): Promise<RenderComponent> => {
  const mockDispatch = jest.fn();

  (useCartContext as jest.Mock).mockReturnValue({
    state: {
      cart: [phone],
      amount: phone.amount,
      total: phone.price * phone.amount,
      isLoading: false,
    },
    dispatch: mockDispatch,
  });

  const { container } = render(<CartItem id={phone.id} />);

  await screen.findByRole("heading", {
    name: phone.title,
  });

  return {
    container: container,
    phone: phone,
    mockDispatch: mockDispatch,
  };
};

jest.mock("@src/hooks/useCartContext", () => ({
  useCartContext: jest.fn(),
}));

describe("CartItem.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
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
      const { phone, mockDispatch } = await renderComponent();

      const increaseButton = screen.getByRole("button", {
        name: /increase phone/i,
      });

      expect(increaseButton).toBeInTheDocument();

      await user.click(increaseButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "INCREASE_ITEM",
        payload: { id: phone.id },
      });
    });

    test("It is intended to decrease the amount of the cell phone when the decrease amount button is touched.", async () => {
      const { phone, mockDispatch } = await renderComponent();

      const decreaseButton = screen.getByRole("button", {
        name: /decrease phone/i,
      });

      expect(decreaseButton).toBeInTheDocument();

      await user.click(decreaseButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "DECREASE_ITEM",
        payload: { id: phone.id },
      });
    });

    test("Cell phone disappear when you tap on the remove button.", async () => {
      const { phone, mockDispatch } = await renderComponent();

      const removeButton = screen.getByRole("button", {
        name: /remove/i,
      });

      expect(removeButton).toBeInTheDocument();

      await user.click(removeButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "CLEAR_ITEM",
        payload: { id: phone.id },
      });
    });
  });
});
