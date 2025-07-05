import { apiSlice } from "../../app/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    user: builder.query({
      query: (id) => `users/find/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { ...userData },
      }),
      invalidatesTags: ["User"],
    }),
    usersStats: builder.query({
      query: () => "users/stats",
    }),
  }),
});

export const {
  useUsersQuery,
  useUsersStatsQuery,
  useUserQuery,
  useUpdateUserMutation,
} = userApiSlice;
