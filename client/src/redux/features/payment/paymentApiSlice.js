import { apiSlice } from "../../app/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: ({ tokenId, amount }) => ({
        url: "/checkout/payment",
        method: "POST",
        body: { tokenId, amount },
      }),
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApiSlice;
