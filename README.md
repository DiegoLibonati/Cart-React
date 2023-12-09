# Cart-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that simulates a shopping cart. Basically we will have different types of cell phones, each one of these cell phones will have a price as we add more, the total price will be added and also the amount of products in the cart will be added. If we touch `Clear cart` we will eliminate all the items in the cart. Use useReducer.

## Technologies used

1. React JS
2. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/34`](https://www.diegolibonati.com.ar/#/project/34)

## Video

https://user-images.githubusercontent.com/99032604/199618079-8e5e1e41-e011-4957-95ea-e503d9fe90f1.mp4

## Documentation

1. In `helpers/reducer.js` we are going to find all the reducers where the states are modified through the executed actions.
2. In `helpers/data.js` we are going to find all the information that we are going to render as if it was taken from an API.
3. In `helpers/context.js` we will find all the states and functions that will be executed in the whole application.

In `initialState` we are going to store the initial states of all our application.

```
const initialState = {
  loading: false,
  cart: phones,
  total: 0,
  amount: 0,
};
```

In `clearCart()` we are going to execute the cleaning of the shopping cart. In `clearItem()` we will clear that specific item from the cart list. In `increaseItem()` we will increment by 1 each time we tap to add one more product from it. In `decreaseItem()` we will decrement by 1 each time we tap to subtract one more product from it and finally in `fetchData()` we will get all the information from `helpers/data.js`:

```
const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
};

const clearItem = (id) => {
    dispatch({ type: "CLEAR_ITEM", payload: id });
};

const increaseItem = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
};

const decreaseItem = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
};

const fetchData = async () => {
    dispatch({ type: "LOADING" });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
};
```
