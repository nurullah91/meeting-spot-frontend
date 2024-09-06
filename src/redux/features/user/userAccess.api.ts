import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userAccessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/rooms",
          method: "GET",
          params: params,
        };
      },
    }),
    getAllAvailableSlots: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/slots/availability",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slots"],
    }),
    getSingleRoom: builder.query({
      query: (roomId: string) => {
        return {
          url: `/rooms/${roomId}`,
          method: "GET",
        };
      },
    }),

    createBooking: builder.mutation({
      query: (data) => {
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetSingleRoomQuery,
  useGetAllAvailableSlotsQuery,
  useCreateBookingMutation,
} = userAccessApi;
