# Cart React

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with yarn install
4. Use yarn dev or start (depends package.json) to run the app page

## Description

I made a web application that simulates a shopping cart. Basically we will have different types of cell phones, each one of these cell phones will have a price as we add more, the total price will be added and also the amount of products in the cart will be added. If we touch `Clear cart` we will eliminate all the items in the cart. Use useReducer.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Libraries used

```
"@testing-library/jest-dom": "^6.6.2",
"@testing-library/react": "^16.0.1",
"@testing-library/user-event": "^14.5.2",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-icons": "^4.4.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

"@testing-library/dom": "^10.4.0",
"@types/jest": "^29.5.13",
"@types/react": "^18.3.11",
"@types/react-dom": "^18.3.1",
"msw": "^2.4.11",
"typescript": "^5.3.3"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Cart-React`](https://www.diegolibonati.com.ar/#/project/Cart-React)

## Video

https://user-images.githubusercontent.com/99032604/199618079-8e5e1e41-e011-4957-95ea-e503d9fe90f1.mp4

## Testing

1. Join to the correct path of the clone and join to: `bookstore-app`
2. Execute: `yarn install`
3. Execute: `yarn test`

## Documentation

1. In `context/reducer.tsx` we are going to find all the reducers where the states are modified through the executed actions.
3. In `context/context.tsx` we will find all the states and functions that will be executed in the whole application.