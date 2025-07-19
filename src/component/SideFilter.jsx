import React from "react";
import { IoMdClose } from "react-icons/io";

const SideFilter = ({ filters, setFilters, products, isOpen, onClose }) => {
  return (
    <>
      <aside
        data-aos="fade-right"
        className=" md:w-64 w-full hidden lg:block bg-white p-6 rounded-lg shadow-md sticky top-24 h-fit"
      >
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>
        {/* Filter Fields */}
        <FilterFields
          filters={filters}
          setFilters={setFilters}
          products={products}
        />
      </aside>

      {/* Mobile slide-over filter panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end lg:hidden">
          <div className="w-[80%] max-w-xs bg-white p-5 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <IoMdClose
                onClick={onClose}
                className="text-gray-700 text-2xl cursor-pointer"
              />
            </div>
            <FilterFields
              filters={filters}
              setFilters={setFilters}
              products={products}
            />
          </div>
        </div>
      )}
    </>
  );
};

const FilterFields = ({ filters, setFilters, products }) => {
  const uniqueValues = (key) => [...new Set(products.map((p) => p[key]))];

  return (
    <>
      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          {uniqueValues("category").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Company */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Company</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        >
          <option value="">All</option>
          {uniqueValues("brand").map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Color</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="e.g. red"
          value={filters.color}
          onChange={(e) => setFilters({ ...filters, color: e.target.value })}
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">
          Max Price: ₹{filters.price}
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      <button
        onClick={() =>
          setFilters({ category: "", company: "", color: "", price: 1000 })
        }
        className="w-full btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-black  hover:bg-white group py-1.5 px-2.5"
      >
        <span className="w-56 h-48  bg-red-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">
          {" "}
          Clear Filters
        </span>
      </button>
    </>
  );
};

export default SideFilter;
