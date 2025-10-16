import { screen, render } from "@testing-library/react";

import { Loading } from "@src/components/Loading/Loading";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loading />);
  return { container: container };
};

describe("Loading.tsx", () => {
  describe("General Tests.", () => {
    test("It is expected that the loading component renders correctly", () => {
      renderComponent();

      const loadingElement = screen.getByText(/loading\.\.\./i);

      expect(loadingElement).toBeInTheDocument();
    });

    test("It is expected that the loading title is a heading element", () => {
      renderComponent();

      const headingElement = screen.getByRole("heading", {
        name: /loading\.\.\./i,
      });

      expect(headingElement).toBeInTheDocument();
      expect(headingElement.tagName).toBe("H2");
    });

    test("It is expected that the loading container has the correct class", () => {
      const { container } = renderComponent();

      const loadingContainer = container.querySelector(".loading");

      expect(loadingContainer).toBeInTheDocument();
      expect(loadingContainer).toHaveClass("loading");
    });

    test("It is expected that the loading header has the correct class", () => {
      const { container } = renderComponent();

      const loadingHeader = container.querySelector(".loading__header");

      expect(loadingHeader).toBeInTheDocument();
      expect(loadingHeader).toHaveClass("loading__header");
    });

    test("It is expected that the loading title has the correct class", () => {
      const { container } = renderComponent();

      const loadingTitle = container.querySelector(".loading__title");

      expect(loadingTitle).toBeInTheDocument();
      expect(loadingTitle).toHaveClass("loading__title");
      expect(loadingTitle?.textContent).toBe("Loading...");
    });
  });
});
