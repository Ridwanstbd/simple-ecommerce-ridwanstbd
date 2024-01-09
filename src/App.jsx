import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./features/productlist/ProductList";
import CartModal from "./features/cart/CartModal"
import FilterModal from "./features/filter/FilterModal";


function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  }
  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  }
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true)
  }
  const handleHideModalFilter = () => {
    setIsOpenModalFilter(false)
  }

  return (
    <div className="relative">
      {isOpenModalCart ? <CartModal handleHideModalCart={handleHideModalCart} /> : null}
      <Header handleOpenModalCart={handleOpenModalCart} />
      <main className="max-w-7x1 mx-auto px-4 mt-20 ">
        <ProductList handleOpenModalFilter={handleOpenModalFilter} />
      </main>
      {isOpenModalFilter ? <FilterModal handleHideModalFilter={handleHideModalFilter} /> : null}
    </div>
  );
}

export default App;
