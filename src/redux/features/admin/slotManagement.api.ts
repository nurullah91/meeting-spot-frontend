import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlots: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots"],
    }),
    updateSlots: builder.mutation({
      query: (args) => ({
        url: `/slots/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["slots"],
    }),
    deleteSlots: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useCreateSlotsMutation,
  useUpdateSlotsMutation,
  useDeleteSlotsMutation,
} = slotManagementApi;
