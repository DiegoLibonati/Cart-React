import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "@src/entities/app";

import { CartPage } from "@src/pages/CartPage/CartPage";
import { Navbar } from "@src/components/Navbar/Navbar";

import { CartProvider } from "@src/contexts/CartContext/CartContext";

import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";

import { createServer } from "@tests/msw/server";
import { phone, phones } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
  firstPhone: Phone;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <CartProvider>
      <Navbar />
      <CartPage />
    </CartProvider>
  );

  return {
    container: container,
    firstPhone: phone,
  };
};

describe("CartPage.tsx", () => {
  createServer([
    {
      path: "/react-useReducer-cart-project",
      method: "get",
      res: () => {
        return phones;
      },
    },
  ]);

  describe("General Tests.", () => {
    test("If you change the quantity of a cell phone, you must change the quantity in the navbar.", async () => {
      const { container, firstPhone } = renderComponent();

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

      const amountElementNavBar = container.querySelector<HTMLParagraphElement>(
        ".navbar__shop-amount-text"
      );

      expect(amountElementNavBar).toBeInTheDocument();

      const { amount: initialAmount } = getTotalAndAmount(phones);
      expect(amountElementNavBar).toHaveTextContent(String(initialAmount));

      await user.click(firstPhoneElementIncreaseButton!);

      await waitFor(() => {
        const amountIncreased = initialAmount + 1;
        expect(amountElementNavBar).toHaveTextContent(String(amountIncreased));
      });

      await user.click(firstPhoneElementDecreaseButton!);

      await waitFor(() => {
        expect(amountElementNavBar).toHaveTextContent(String(initialAmount));
      });
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

      expect(
        screen.queryByRole("heading", {
          name: /loading/i,
        })
      ).not.toBeInTheDocument();
    });

    test("It is expected that the CartPage renders correctly", async () => {
      const { container, firstPhone } = renderComponent();

      await screen.findByRole("heading", {
        name: firstPhone.title,
      });

      const mainElement = container.querySelector<HTMLElement>(".cart-page");

      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass("main-app");
    });

    test("It is expected that all phones are rendered after loading", async () => {
      const { container, firstPhone } = renderComponent();

      await screen.findByRole("heading", {
        name: firstPhone.title,
      });

      const phoneElements = container.querySelectorAll<HTMLDivElement>(".item");

      expect(phoneElements).toHaveLength(phones.length);
    });
  });
});
