import { Spin } from "antd";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";

export interface IRelatedRoomsProps {
  category: string;
}
export default function RelatedRooms({ category }: IRelatedRoomsProps) {
  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: 4 },
    { name: "category", value: category },
  ].filter((item) => item.value !== undefined);

  const { data: allRoomsData, isLoading } = useGetAllRoomsQuery(queryParams);

  console.log(allRoomsData);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        This is RelatedRooms component
      </h1>
    </div>
  );
}
