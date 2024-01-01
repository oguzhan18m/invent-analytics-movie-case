import { createBrowserRouter } from "react-router-dom";
import Movies from "../pages/Movies";
import MovieDetail from "../pages/MovieDetail";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Movies />,
	},
	{
		path: "/movie/:id",
		element: <MovieDetail />,
	},
]);
