import { apiSlice } from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (cat) =>
        cat ? `/products?category=${cat}` : "/products",
    }),
    getProductById: builder.query({
      query: (id) => `/products/find/${id}`,
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsQuery } = productApiSlice;
