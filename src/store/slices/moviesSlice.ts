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
	movies: IMovieSearchResult;
	isLoading: boolean;
}

export const fetchMovies: any = createAsyncThunk(
	"movies/fetchMovies",
	async ({
		title,
		page,
		type,
		year,
	}: {
		title: string;
		page: number;
		type: string;
		year: string;
	}) => {
		try {
			if (!title) {
				title = "Pokemon";
			}
			const { data } = await axiosInt.get(
				`&s=${title}&page=${page}&type=${type ?? undefined}&y=${
					year ?? undefined
				}`
			);
			return data;
		} catch (error) {
			console.log({ error });
		}
	}
);

const initialState: IState = {
	movies: {
		Search: [],
		totalResults: "",
		Response: "",
	},
	isLoading: true,
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchMovies?.fulfilled, (state, action) => {
				if (action.payload?.Error) {
					enqueueSnackbar(action.payload?.Error, { variant: "error" });
					state.movies = {
						...state.movies,
						Search: [],
					};
				}

				if (action.payload?.Response === "True") {
					state.movies = action.payload;
					enqueueSnackbar(
						`${action.payload.totalResults} results listed successfully`,
						{ variant: "success" }
					);
				}

				state.isLoading = false;
			});
	},
});
