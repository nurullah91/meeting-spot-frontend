export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TRoom = {
  amenities: string[];
  capacity: number;
  createdAt: string;
  floorNo: number;
  img: string;
  isDeleted: boolean;
  name: string;
  pricePerSlot: number;
  roomNo: number;
  updatedAt: string;
  _id: string;
};

export type TSlot = {
  date: string;
  endTime: string;
  isBooked: boolean;
  room: TRoom;
  startTime: string;
  _id: string;
};
