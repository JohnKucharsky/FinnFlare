import { createClient } from "contentful";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Footer from "./components/Footer";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Products from "./Products";

function App() {
  const [products, setProducts] = useState("");
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  function handleAdd(product) {
    const exist = cart.find((x) => x.sys.id === product.sys.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.sys.id === product.sys.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  function onDelete(product) {
    const exist = cart.find((i) => i.sys.id === product.sys.id);
    if (exist.qty === 1) {
      setCart(cart.filter((i) => i.sys.id !== product.sys.id));
    } else {
      setCart(
        cart.map((x) =>
          x.sys.id === product.sys.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  let prod = products.slice(0, 4);

  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });
  useEffect(() => {
    async function getProducts() {
      const res = await client.getEntries({ content_type: "product" });

      setProducts(res.items);
    }
    getProducts();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home prod={prod} cart={cart} />} />
          <Route
            path="/products"
            element={<Products products={products} cart={cart} />}
          />
          <Route
            path="products/details/:id/*"
            element={
              <ProductDetails
                handleAdd={handleAdd}
                cart={cart}
                client={client}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleAdd={handleAdd}
                setCart={setCart}
                onDelete={onDelete}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
