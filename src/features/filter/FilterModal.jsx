/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import { useRef } from "react";
import { setSearch, setSortMethod, resetFilter } from "./filterSlice";
import Close from "./assets/close.svg";

const FilterModal = ({ handleHideModalFilter }) => {
    const dispatch = useDispatch()
    const searchRefName = useRef()

    const handleFilter = () => {
        dispatch(setSearch(searchRefName.current.value))
        handleHideModalFilter()
    }
    const handleResetFilter = () => {
        dispatch(resetFilter())
        handleHideModalFilter()
    }


    return (
        <Modal>
            <div className="p-4 relative">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-4">Filter</h2>
                    <button onClick={handleHideModalFilter}>
                        <img src={Close} alt="close" className="w-8 h-8" />
                    </button>
                </div>
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
                            onChange={(e) => dispatch(setSortMethod(e.target.value))}
                        >
                            <option value="default">Default</option>
                            <option value="price-low-to-high">Price Low to High</option>
                            <option value="price-high-to-low">Price High to Low</option>
                            <option value="name-a-to-z">Name A to Z</option>
                            <option value="name-z-to-a">Name Z to A</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-1 px-2"
                        onClick={handleFilter}
                    >
                        Apply
                    </button>
                    <button
                        className="text-black bg-grey-bg-slate-600 rounded-lg text-sm py-1 px-2 hover:underline"
                        onClick={handleResetFilter}
                    >
                        Reset
                    </button>

                </div>
            </div>
        </Modal>
    )
}
export default FilterModal;