import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

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
export type TUser = {
  email: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  name: string;
  role: string;
  _id: string;
};
