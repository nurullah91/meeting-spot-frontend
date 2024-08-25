import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlots: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
    }),
    updateSlots: builder.mutation({
      query: (args) => ({
        url: `/rooms/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
    }),
    deleteSlots: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSlotsMutation,
  useUpdateSlotsMutation,
  useDeleteSlotsMutation,
} = slotManagementApi;
