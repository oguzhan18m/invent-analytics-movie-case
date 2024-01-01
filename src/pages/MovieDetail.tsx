import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../store/slices/movieDetailSlice";
import { RootState } from "../store/store";
import {
	CardContent,
	Typography,
	CardMedia,
	Grid,
	Chip,
	CircularProgress,
	Stack,
	Box,
	Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import _ from "lodash";

const MovieDetail = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { movieDetails, isLoading } = useSelector(
		(state: RootState) => state.movieDetail
	);

	console.log({ movieDetails });

	React.useEffect(() => {
		dispatch(fetchMovieById({ id: params.id }));
	}, [params]);

	if (isLoading) {
		return (
			<Stack width="100%" alignItems="center" justifyContent="center">
				<CircularProgress size={24} />
			</Stack>
		);
	}

	return (
		<Grid container spacing={6}>
			<Grid item xs={12}>
				<Button
					startIcon={<ArrowBack />}
					variant="contained"
					onClick={() => window.history.back()}>
					Back
				</Button>
			</Grid>
			<Grid item xs={12} md={4}>
				<CardMedia
					component="img"
					alt={movieDetails.Title}
					height="auto"
					image={movieDetails.Poster}
					title={movieDetails.Title}
				/>
			</Grid>
			<Grid item xs={12} md={8}>
				<CardContent>
					<Typography mb={2} variant="h5" component="h2">
						{movieDetails.Title} ({movieDetails.Year})
					</Typography>
					<Typography mb={2} variant="subtitle1" color="textSecondary">
						{movieDetails.Genre ?? "--"} | {movieDetails.Runtime ?? "--"} |
						Rated: {movieDetails.Rated ?? "--"}
					</Typography>
					<Typography mb={2} variant="body2" component="p">
						{movieDetails.Plot}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Director: {movieDetails.Director ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Writers: {movieDetails.Writer ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Actors: {movieDetails.Actors ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Language: {movieDetails.Language ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Country: {movieDetails.Country ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Box Office: {movieDetails.BoxOffice ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Awards: {movieDetails.Awards ?? "--"}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						Type: {_.capitalize(movieDetails.Type) ?? "--"}
					</Typography>
					<Typography mb={2} variant="subtitle2" color="textSecondary">
						Released on: {movieDetails.Released ?? "--"}
					</Typography>
					<Box>
						{movieDetails.Ratings.map(
							(rating: { Source: string; Value: string }, index: number) => (
								<Chip
									key={index}
									label={`${rating.Source ?? "--"}: ${rating.Value ?? "--"}`}
									color="primary"
									style={{ marginRight: "5px", marginBottom: "5px" }}
								/>
							)
						)}
						<Chip
							label={`Metascore: ${movieDetails.Metascore ?? "--"}`}
							color="secondary"
							style={{ marginRight: "5px", marginBottom: "5px" }}
						/>
						<Chip
							label={`IMDb Rating: ${movieDetails.imdbRating ?? "--"}/10`}
							color="secondary"
							style={{ marginRight: "5px", marginBottom: "5px" }}
						/>
						<Chip
							label={`IMDb Votes: ${movieDetails.imdbVotes ?? "--"}`}
							color="secondary"
							style={{ marginRight: "5px", marginBottom: "5px" }}
						/>
					</Box>
				</CardContent>
			</Grid>
		</Grid>
	);
};

export default MovieDetail;
