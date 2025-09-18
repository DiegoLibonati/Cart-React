import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Phone } from "@src/entities/entities";

import { CartContainer } from "@src/components/CartContainer/CartContainer";

import { createServer } from "@tests/msw/server";
import { phone, phones } from "@tests/jest.constants";

import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";
import { AppProvider } from "@src/context/context";

const renderComponent = (): {
  container: HTMLElement;
  firstPhone: Phone;
} => {
  const { container } = render(
    <AppProvider>
      <CartContainer />
    </AppProvider>
  );

  return {
    container: container,
    firstPhone: phone,
  };
};

describe("CartContainer.tsx", () => {
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

      const { total } = getTotalAndAmount(phones);

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
      const phoneElements = container.querySelectorAll(".item");

      expect(phoneElements).toHaveLength(phones.length);
    });

    test("You must change the total to be paid if you add or reduce the number of cell phones to be purchased.", async () => {
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

      await user.click(firstPhoneElementIncreaseButton!);

      const { total } = getTotalAndAmount(phones);
      const totalUpdatedIncrease = total + firstPhone.price;

      const totalElementIncrease = screen.getByText(
        `$ ${totalUpdatedIncrease}`
      );

      expect(totalElementIncrease).toBeInTheDocument();

      await user.click(firstPhoneElementDecreaseButton!);

      const totalUpdatedDecrease = (
        totalUpdatedIncrease - firstPhone.price
      ).toFixed(2);

      const totalElementDecrease = screen.getByText(
        `$ ${totalUpdatedDecrease}`
      );

      expect(totalElementDecrease).toBeInTheDocument();
    });
  });
});
