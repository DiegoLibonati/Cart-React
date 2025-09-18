import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "@src/entities/entities";

import { App } from "@src/App";

import { createServer } from "@tests/msw/server";
import { phone, phones } from "@tests/jest.constants";

import { AppProvider } from "@src/context/context";
import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";

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

describe("App.tsx", () => {
  describe("General Tests.", () => {
    createServer([
      {
        path: "/react-useReducer-cart-project",
        method: "get",
        res: () => {
          return phones;
        },
      },
    ]);

    test("If you change the quantity of a cell phone, you must change the quantity in the navbar.", async () => {
      const { container, firstPhone } = renderComponent();

      await screen.findByRole("heading", {
        name: firstPhone.title,
      });

      // eslint-disable-next-line
      const phoneElements = container.querySelectorAll(".item");

      expect(phoneElements).toHaveLength(phones.length);

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
      const amountElementNavBar = container.querySelector(
        ".navbar__shop-amount-text"
      );

      expect(amountElementNavBar).toBeInTheDocument();

      await user.click(firstPhoneElementIncreaseButton!);

      const { amount } = getTotalAndAmount(phones);
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
  });
});
