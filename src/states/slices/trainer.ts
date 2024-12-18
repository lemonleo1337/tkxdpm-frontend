import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { TrainerDataType, getDetailTrainer, getListTrainers } from "api/trainer";
import { PageType, PaginationType } from "contains/type";
import { IRootState } from "../types";

export type FilterTrainer = Pick<
    TrainerDataType,
    "TrainerId" | "name" | "email" | "phone" | "address" | "birth_date" | "avatar" | "gender" | "specialty"
> & {
    page?: PageType;
}

interface TrainerState {
    status: "loading" | "success" | "error" | "idle";
    filter: FilterTrainer;
    pagination: PaginationType;
    results: TrainerDataType[],
    trainer?: TrainerDataType;
}

const initialState: TrainerState = {
    status: "idle",
    filter: {
        TrainerId: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        birth_date: "",
        avatar: "",
        gender: "",
        specialty: "",
        page: {
            page: 0,
            take: 8,
            sort: "asc",
            sort_by: "id",
        },
    },
    pagination: {
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    results: [],
    trainer: undefined,
}
export const fetchTrainer = createAsyncThunk("trainer/fetchTrainer",
    async (
        _: void,
        thunkApi,
    ) => {
        const state = thunkApi.getState() as IRootState;
        const filter = state.trainer.filter;
        const response = await getListTrainers(filter);
        return response;
    });
export const fetchTrainerById = createAsyncThunk("trainer/fetchTrainerById", getDetailTrainer);
export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterTrainer>) => {
            state.filter = action.payload;
        },
        clearFilter: (state) => {
            state.filter = initialState.filter;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchTrainer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTrainer.fulfilled, (state, action) => {
                state.status = "success";
                state.results = action.payload.data;
                state.pagination = action.payload.meta;
            })
            .addCase(fetchTrainer.rejected, (state) => {
                state.status = "error";
            })
            .addCase(fetchTrainerById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTrainerById.fulfilled, (state, action) => {
                state.status = "success";
                state.trainer = action.payload.data;
            })
            .addCase(fetchTrainerById.rejected, (state) => {
                state.status = "error";
            }),
});
export const selectTrainer = (state: IRootState) => state.trainer;
export const selectTrainerResults = createSelector(
    selectTrainer,
    (trainer) => trainer.results
);
export const selectTrainerPagination = createSelector(
    selectTrainer,
    (trainer) => trainer.pagination
);
export const selectTrainerStatus = createSelector(
    selectTrainer,
    (trainer) => trainer.status
);
export const selectTrainerFilter = createSelector(
    selectTrainer,
    (trainer) => trainer.filter
);
export const selectTrainerDetail = createSelector(
    selectTrainer,
    (trainer) => trainer.trainer,
);


export const { setFilter, clearFilter } = trainerSlice.actions;
export default trainerSlice.reducer;
