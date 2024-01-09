/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Star from "../productlist/assets/star.svg";
import FilterIcon from "../productlist/assets/filter.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import { selectFilter } from "../filter/filterSlice"
import {
  setProducts,
  setLoading,
  selectProducts,
} from "./productSlice";

const ProductList = ({ handleOpenModalFilter }) => {
  const { items: products, isLoading } = useSelector(selectProducts)
  const { search, sortMethod } = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(setProducts(data))
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [dispatch]);

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortMethod) {
        case "price-low-to-high":
          return a.price - b.price;
        case "price-high-to-low":
          return b.price - a.price;
        case "name-a-to-z":
          return a.title.localeCompare(b.title);
        case "name-z-to-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });


  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };
  const dollar = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(number)
  }

  return (
    <div className="w-full h-full relative grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-4">
      <div className="absolute top-3 left-3 z-20" >
        <button
          className="relative text-gray-100 bg-blue-800 px-6 py-1 rounded-full flex gap-2"
          type="button"
          onClick={handleOpenModalFilter}
        >
          <img src={FilterIcon} alt="filter" className="w-6 h-6" />
          <p>Filter</p>
        </button>
      </div>

      {(isLoading && <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 bg-white bg-opacity-30 z-50">
        <div className="w-50 h-50 relative flex">
          <div
            className="absolute loading"
          ></div>
        </div>
      </div>) || filteredProducts.map((product) => {
        const minTitle = product.title.length > 25 ? `${product.title.substring(0, 25)} ...` : product.title;
        return (
          <div
            key={product.id}
            className="group bg-white rounded-xl border shadow p-4 w-full gap-2 flex flex-col justify-between"
          >
            <div className="relative w-[80%] h-[150px] mx-auto overflow-hidden ">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out "
              />
            </div>
            <div className="flex flex-col">
              <h4 className=" text-gray-500">{product.category}</h4>
              <h3 className="font-medium">{minTitle}</h3>
              <h3 className="text-lg font-bold">{dollar(product.price)}</h3>
              <span className="flex flex-row items-center gap-2"><img src={Star} alt="star" className="w-5 h-5" /> {product.rating.rate}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                onClick={() => {
                  !isLoading && handleClickBuy(product);
                }}

              >
                BUY NOW
              </button>
            </div>
          </div>
        );
      })}

    </div>
  );
};
export default ProductList;
