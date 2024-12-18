import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BookingDataType, postCreateBooking } from "api/booking";
import { IRootState } from "../types"

interface BookingState {
    status: "loading" | "success" | "error" | "idle";
    results: BookingDataType[]
    booking?: BookingDataType;
}

const initialState: BookingState = {
    status: "idle",
    results: [],
    booking: undefined,
}

// export const fetchBookingSchedule = createAsyncThunk("booking/fetchBookingSchedule",)
export const createBooking = createAsyncThunk("booking/postCreateBooking", postCreateBooking)
export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        resetState: (state) => {
            state.status = "idle";
            state.booking = undefined;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(createBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.status = "success";
                state.booking = action.payload.data;
            })
            .addCase(createBooking.rejected, (state) => {
                state.status = "error";
            }),
});
export const selectBooking = (state: IRootState) => state.booking;
export const selectBookingResults = createSelector(
    selectBooking,
    (booking) => booking.results,
);

export const selectBookingStatus = createSelector(
    selectBooking,
    (booking) => booking.status,
);
export default bookingSlice.reducer;
