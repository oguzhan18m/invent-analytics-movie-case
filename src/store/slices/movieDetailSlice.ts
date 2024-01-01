import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInt } from "../../utils/axios";
import { enqueueSnackbar } from "notistack";

interface IMovieSearchResult {
	Search: {
		Poster: string;
		Title: string;
		Type: string;
		Year: string;
		imdbID: string;
	}[];
	totalResults: string;
	Response: string;
}

interface IState {
	movieDetails: any;
	isLoading: boolean;
}

export const fetchMovieById: any = createAsyncThunk(
	"movies/fetchMovieById",
	async ({ id }: { id: string }) => {
		try {
			const { data } = await axiosInt.get(`&i=${id}`);
			return data;
		} catch (error) {
			console.log({ error });
		}
	}
);

const initialState: IState = {
	movieDetails: {},
	isLoading: true,
};

export const movieDetailSlice = createSlice({
	name: "movieDetail",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchMovieById?.fulfilled, (state, action) => {
				if (action.payload?.Error) {
					enqueueSnackbar(action.payload?.Error, { variant: "error" });
					state.movieDetails = {
						...state.movieDetails,
						Search: [],
					};
				}

				if (action.payload?.Response === "True") {
					state.movieDetails = action.payload;
				}

				state.isLoading = false;
			});
	},
});
