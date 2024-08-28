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
          url: "/students",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllRoomsQuery } = userAccessApi;
