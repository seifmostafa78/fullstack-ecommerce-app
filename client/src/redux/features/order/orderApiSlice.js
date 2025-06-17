import { apiSlice } from "../../app/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: { ...order },
      }),
    }),
    orders: builder.query({
      query: (userId) => `/orders/find/${userId}`,
    }),
  }),
});

export const { useCreateOrderMutation, useOrdersQuery } = orderApiSlice;
