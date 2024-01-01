import axios from "axios";

export const axiosInt = axios.create({
	baseURL: "http://www.omdbapi.com/?apikey=9cc4f856&",
	headers: {
		"Content-Type": "application/json",
	},
});
