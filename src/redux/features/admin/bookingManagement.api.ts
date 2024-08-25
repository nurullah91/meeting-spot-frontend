import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBookings: builder.mutation({
      query: (args) => ({
        url: `/bookings/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
    }),
    deleteBookings: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateBookingsMutation, useDeleteBookingsMutation } =
  roomManagementApi;
