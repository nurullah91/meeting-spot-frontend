import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/auth/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    updateRole: builder.mutation({
      query: (args) => ({
        url: `/auth/update-user/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} = userManagementApi;
