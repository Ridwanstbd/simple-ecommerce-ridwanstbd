/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import Star from "../productlist/assets/star.svg";
import FilterIcon from "../productlist/assets/filter.svg";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import Modal from "../../components/Modal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [sortType, setSortType] = useState(null);
  const searchRefName = useRef()

  //! bucket Sort untuk mengurutkan data
  const bucketSort = (array, key) => {
    const bucketSize = 10;
    const min = Math.min(...array.map(item => item[key]))
    const max = Math.max(...array.map(item => item[key]))

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => [])

    //! distribusi ke elemen
    array.forEach(item => {
      const bucketIndex = Math.floor((item[key] - min) / bucketSize)
      buckets[bucketIndex].push(item)
    })

    //! sorting setiap bucket
    buckets.forEach(bucket => {
      insertionSort(bucket, key)
    })

    //! Menggabungkan bucket kedalam satu array
    return buckets.flat();
  }

  const insertionSort = (array, key) => {
    for (let i = 1; i < array.length; i++) {
      const currentElement = array[i]
      let j = i - 1
      while (j >= 0 && array[j][key] > currentElement[key]) {
        array[j + 1] = array[j]
        j--
      }
      array[j + 1] = currentElement;
    }
  }

  const handleFilter = () => {
    //! Linear (sequential) search untuk data yang tidak terurut seperti judul
    const searchTerm = searchRefName.current.value;

    const searchResult = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );

    switch (sortType) {
      case "price-low-to-high":
        if (!searchTerm) {
          setProducts(bucketSort([...products], "price"));
        } else {
          setProducts(bucketSort([...searchResult], "price"));
        }
        break;
      case "price-high-to-low":
        if (!searchTerm) {
          setProducts(bucketSort([...products], "price").reverse());
        } else {
          setProducts(bucketSort([...searchResult], "price").reverse());
        }
        break;
      case "name-a-to-z":
        setProducts([...products].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case "name-z-to-a":
        setProducts([...products].sort((a, b) => b.title.localeCompare(a.title)));
        break;
      default:
        setProducts([...searchResult])
        break;
    }
    setFilterModalOpen(false);
  }

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
          onClick={() => setFilterModalOpen(true)}
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
      </div>) || products.map((product) => {
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
      {isFilterModalOpen && (
        <Modal onClose={() => setFilterModalOpen(false)}>
          <div className="p-4 relative">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>
            <div className="mb-4 flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-gray-500">Search </label>
                <div className="relative">
                  <input
                    placeholder="Search By Name .."
                    className="w-full p-2 rounded"
                    ref={searchRefName}
                  />

                </div>

              </div>

              <div className="flex flex-col">
                <label className="text-gray-500">Sort By:</label>
                <select
                  className="bg-white border border-gray-300 rounded px-3 py-1"
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-low-to-high">Price Low to High</option>
                  <option value="price-high-to-low">Price High to Low</option>
                  <option value="name-a-to-z">Name A to Z</option>
                  <option value="name-z-to-a">Name Z to A</option>
                </select>
              </div>
            </div>
            <button
              className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-1 px-2"
              onClick={handleFilter}
            >
              Apply
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};
export default ProductList;
