import Product from "./Product";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/features/product/productApiSlice";
import Loader from "../Loader";

const Products = ({ cat, filters, sort }) => {
  const { data: products, isLoading, isError } = useGetProductsQuery(cat);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (cat && products) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <section className="p-5 flex flex-wrap justify-center">
      {isLoading ? (
        <Loader message="Loading Products..." />
      ) : isError ? (
        <p className="text-lg py-8 text-center text-red-500">
          An error occurred while loading the products. Please try again later.
        </p>
      ) : cat && filteredProducts.length === 0 ? (
        <p className="text-lg py-8 text-center text-gray-600">
          No products found matching your filters.
        </p>
      ) : cat ? (
        filteredProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))
      ) : (
        products
          ?.slice(0, 8)
          .map((product) => <Product key={product._id} product={product} />)
      )}
    </section>
  );
};

export default Products;
