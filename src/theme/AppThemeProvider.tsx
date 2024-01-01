import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
	children: React.ReactNode;
}

const AppThemeProvider: React.FC<Props> = ({ children }) => {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#c34b5b",
			},
			secondary: {
				main: "#6c757d",
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: 5,
					},
				},
			},
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
