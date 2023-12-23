/* eslint-disable react/prop-types */
import CartIcon from "../assets/cart.svg";
import FilterIcon from "../assets/filter.svg";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";

const Header = ({ handleOpenModalCart }) => {
  const cartTotalItems = useSelector(selectCartTotalItems);

  return (
    <header className="bg-blue-700 z-10 fixed top-0 left-0 w-full ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-3xl font-bold text-gray-100">
            Simple E-Commerce
          </h1>
          <div className="flex gap-4">
            <button className="relative text-gray-100 bg-blue-800 px-6 py-1 rounded-full " type="button">
              <img src={FilterIcon} alt="filter" className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="relative rounded-full bg-blue-800 p-2 text-gray-100"
              onClick={handleOpenModalCart}
            >
              {cartTotalItems > 0 ?
                <span className="absolute -top-2 -right-2 w-6 h-6 mx-3 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
                  {cartTotalItems}
                </span>
                : null}
              <img src={CartIcon} alt="cart" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
