import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TBookingItem = {
  roomName: string;
  roomId: string;
  date: string;
  time: string;
  slots: string[];
  pricePerSlot: number;
  totalCost: number;
};

export type TBookingState = {
  booking: TBookingItem;
};
const initialState: TBookingState = {
  booking: {
    roomName: "",
    roomId: "",
    date: "",
    time: "",
    slots: [],
    pricePerSlot: 0,
    totalCost: 0,
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addToBooking: (state, action) => {
      state.booking = action.payload;
    },
    emptyBooking: (state) => {
      state.booking = {
        roomName: "",
        roomId: "",
        date: "",
        time: "",
        slots: [],
        pricePerSlot: 0,
        totalCost: 0,
      };
    },
  },
});

export const { addToBooking, emptyBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

export const booking = (state: RootState) => state.booking;
