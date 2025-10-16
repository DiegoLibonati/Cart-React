import { Phone } from "@src/entities/app";

export const getPhones = async (): Promise<Phone[]> => {
  try {
    const response = await fetch("/react-useReducer-cart-project", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching phones.");
    }

    return response.json();
  } catch (e) {
    throw new Error(`Error fetching phones: ${e}.`);
  }
};
