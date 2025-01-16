import { screen, render } from "@testing-library/react";

import { Navbar } from "./Navbar";

import { createServer } from "../../tests/msw/server";
import { phones } from "../../tests/jest.constants";

import { AppProvider } from "../../context/context";
import { getTotalAndAmount } from "../../helpers/getTotalAndAmount";

describe("Navbar.tsx", () => {
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

    test("Rendering of the number of telephones in the cart", async () => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>
      );

      const { amount: amountFromPhones } = getTotalAndAmount(phones);

      const amount = await screen.findByText(
        new RegExp(String(amountFromPhones))
      );

      expect(amount).toBeInTheDocument();
    });

    test("Rendering of the number of telephones in the cart through an initialValue", async () => {
      const phone = phones[0];

      render(
        <AppProvider initialCart={[phones[0]]}>
          <Navbar />
        </AppProvider>
      );

      const amountPhone = phone.amount;
      const amountElement = screen.getByText(new RegExp(String(amountPhone)));

      expect(amountElement).toBeInTheDocument();
    });
  });
});
