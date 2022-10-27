import "./App.css";
import { CartContainer } from "./components/CartContainer";
import { Navbar } from "./components/Navbar";
import { useGlobalContext } from "./helpers/context";

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <>
        <main>
          <section className="cart_container_title">
            <h2>Loading...</h2>
          </section>
        </main>
      </>
    );
  } else {
    return (
      <>
        <header>
          <Navbar></Navbar>
        </header>

        <main>
          <CartContainer></CartContainer>
        </main>
      </>
    );
  }
}

export default App;
