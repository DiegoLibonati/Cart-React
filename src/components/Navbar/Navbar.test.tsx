import { screen, render } from "@testing-library/react";

import { Navbar } from "@src/components/Navbar/Navbar";

import { useCartContext } from "@src/hooks/useCartContext";

import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";

import { phones } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Navbar />);

  return { container: container };
};

jest.mock("@src/hooks/useCartContext", () => ({
  useCartContext: jest.fn(),
}));

describe("Navbar.tsx", () => {
  beforeEach(() => {
    const { total, amount } = getTotalAndAmount(phones);

    (useCartContext as jest.Mock).mockReturnValue({
      state: {
        cart: phones,
        amount: amount,
        total: total,
        isLoading: false,
      },
      dispatch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("Rendering of the number of telephones in the cart", async () => {
      renderComponent();

      const { amount: amountFromPhones } = getTotalAndAmount(phones);

      const amount = await screen.findByText(
        new RegExp(String(amountFromPhones))
      );

      expect(amount).toBeInTheDocument();
      expect(amount.textContent).toBe(String(amountFromPhones));
    });

    test("It is expected that the navbar renders correctly", () => {
      const { container } = renderComponent();

      const navbarElement =
        container.querySelector<HTMLElement>(".header-wrapper");

      expect(navbarElement).toBeInTheDocument();
    });

    test("It is expected that the cart icon is rendered", () => {
      renderComponent();

      const cartIcon =
        document.querySelector<HTMLElement>(".navbar__shop-icon");

      expect(cartIcon).toBeInTheDocument();
    });

    test("It is expected that the amount badge is rendered", () => {
      const { container } = renderComponent();

      const amountBadge = container.querySelector<HTMLDivElement>(
        ".navbar__shop-amount"
      );

      expect(amountBadge).toBeInTheDocument();
    });

    test("It is expected to show 0 when cart is empty", () => {
      (useCartContext as jest.Mock).mockReturnValue({
        state: {
          cart: [],
          amount: 0,
          total: 0,
          isLoading: false,
        },
        dispatch: jest.fn(),
      });

      renderComponent();

      const amountText = screen.getByText("0");

      expect(amountText).toBeInTheDocument();
    });
  });
});
