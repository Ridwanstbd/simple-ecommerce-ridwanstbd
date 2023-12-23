import { useState, useEffect } from "react";
import Star from "../productlist/star.svg";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="w-full h-full relative grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-4">
      {isLoading && <p>loading...</p>}
      {products.map((product) => {
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
            <div className="flex flex-col ">
              <h4 className=" text-gray-500">{product.category}</h4>
              <h3 className="font-medium">{minTitle}</h3>
              <h3 className="text-lg font-bold">{product.price}</h3>
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
