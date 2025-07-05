import { apiSlice } from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => "products",
      providesTags: ["Product"],
    }),
    product: builder.query({
      query: (id) => `products/find/${id}`,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: { ...productData },
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    productsStats: builder.query({
      query: () => "products/stats",
    }),
  }),
});

export const {
  useProductsStatsQuery,
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
