import React, { useMemo } from "react";
import {
	Card,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/slices/moviesSlice";
import { RootState } from "../store/store";
import { CalendarToday, Search } from "@mui/icons-material";
import _, { debounce } from "lodash";
import { useNavigate, useNavigation } from "react-router-dom";

const Movies = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [title, setTitle] = React.useState("Pokemon");
	const [year, setYear] = React.useState("");
	const [type, setType] = React.useState("");
	const [paginationModel, setPaginationModel] = React.useState({
		page: 0,
		pageSize: 10,
	});

	const { movies, isLoading } = useSelector((state: RootState) => state.movies);

	const debouncedFetchMovies = React.useCallback(
		debounce((title, page, year, type) => {
			dispatch(
				fetchMovies({
					title,
					page: page + 1,
					year,
					type,
				})
			);
		}, 500),
		[dispatch]
	);

	React.useEffect(() => {
		setTitle(title);
	}, [title]);

	React.useEffect(() => {
		debouncedFetchMovies(title, paginationModel.page, year, type);
	}, [title, paginationModel, year, type, debouncedFetchMovies]);

	const handleChangeType = (event: SelectChangeEvent) => {
		setType(event.target.value as string);
	};

	const columns: GridColDef[] = [
		{
			field: "imdbId",
			minWidth: 200,
			flex: 1,
			editable: false,
			sortable: false,
			disableColumnMenu: true,
			renderHeader: () => <strong>IMDB ID</strong>,
		},
		{
			field: "type",
			minWidth: 200,
			flex: 1,
			editable: false,
			sortable: false,
			disableColumnMenu: true,
			renderHeader: () => <strong>Type</strong>,
		},
		{
			field: "title",
			minWidth: 200,
			flex: 1,
			editable: false,
			sortable: false,
			disableColumnMenu: true,
			renderHeader: () => <strong>Movie title</strong>,
			renderCell: (params) => (
				<Typography
					variant="body2"
					sx={{ cursor: "pointer", textDecoration: "underline" }}>
					{params.value}
				</Typography>
			),
		},
		{
			field: "year",
			align: "right",
			headerAlign: "right",
			minWidth: 200,
			flex: 1,
			editable: false,
			sortable: false,
			disableColumnMenu: true,
			renderHeader: () => <strong>Year</strong>,
		},
	];

	const rows = useMemo(
		() =>
			movies?.Search?.map((movie) => {
				return {
					id: movie?.imdbID,
					imdbId: movie?.imdbID,
					type: _.capitalize(movie?.Type),
					title: movie?.Title,
					year: movie?.Year,
				};
			}),
		[movies]
	);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Card sx={{ width: "100%", mb: 4, p: 2 }}>
					<Stack>
						<Stack direction="row" alignItems="center">
							<TextField
								size="small"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Search a movie"
								sx={{ mr: 2 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Search />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								size="small"
								value={year}
								onChange={(e) => setYear(e.target.value)}
								placeholder="Year"
								sx={{ mr: 2 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<CalendarToday fontSize="small" />
										</InputAdornment>
									),
								}}
							/>
							<FormControl size="small" sx={{ minWidth: 120 }}>
								<InputLabel>Type</InputLabel>
								<Select
									value={type}
									size="small"
									label="Type"
									onChange={handleChangeType}>
									<MenuItem value={"movie"}>Movie</MenuItem>
									<MenuItem value={"series"}>Series</MenuItem>
									<MenuItem value={"episode"}>Episode</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Stack>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<DataGrid
					rowHeight={60}
					rows={rows}
					columns={columns}
					loading={isLoading}
					rowCount={Number(movies?.totalResults)}
					onPaginationModelChange={setPaginationModel}
					pageSizeOptions={[10]}
					paginationMode="server"
					onRowClick={(params) => {
						navigate(`/movie/${params.id}`);
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default Movies;
