import { GetPhonesResponse } from "@src/entities/responses";

export const getPhones = async (): Promise<GetPhonesResponse> => {
  try {
    const response = await fetch("/react-useReducer-cart-project", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching phones.");
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching phones: ${e}.`);
  }
};
