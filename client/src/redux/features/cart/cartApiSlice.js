import { apiSlice } from "../../app/apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => `/carts/find/${userId}`,
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: (cartData) => ({
        url: "/carts",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ cartId, cartData }) => ({
        url: `/carts/${cartId}`,
        method: "PUT",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useLazyGetCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApiSlice;
