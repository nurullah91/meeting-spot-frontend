export type TUser = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  address: string;
  isDeleted: boolean;
  role: string;
  _id: string;
};

export type TRoom = {
  _id: string;
  img: string;
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  capacity: number;
  amenities: string[];
  createdAt: string;
  isDeleted: boolean;
  updatedAt: string;
};

export type TSlot = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  room: TRoom;
  __v: number;
};

export type TBooking = {
  _id: string;
  date: string;
  isConfirmed: string;
  isDeleted: boolean;
  room: TRoom;
  slots: TSlot[];
  totalAmount: number;
  user: TUser;
  __v: number;
};
