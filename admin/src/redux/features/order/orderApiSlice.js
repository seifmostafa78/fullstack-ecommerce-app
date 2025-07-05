import { apiSlice } from "../../app/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => "orders",
    }),
    ordersStats: builder.query({
      query: () => "orders/stats",
    }),
    income: builder.query({
      query: () => "orders/income",
    }),
  }),
});

export const { useOrdersQuery, useOrdersStatsQuery, useIncomeQuery } =
  orderApiSlice;
