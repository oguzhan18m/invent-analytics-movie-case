import React from "react";
import {
	AppBar,
	Toolbar,
	CssBaseline,
	useMediaQuery,
	useTheme,
	Typography,
	Stack,
	Grid,
	Box,
} from "@mui/material";

interface Props {
	children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid container flex={1}>
			<Grid item xs={12}>
				<CssBaseline />
				<AppBar
					position="absolute"
					sx={{ bgcolor: theme.palette.common.white, height: 100 }}>
					<Toolbar
						sx={{
							px: { xs: 2, sm: 3, md: 4 },
							display: "flex",
							width: "100%",
							height: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Grid container width={"100%"}>
							<Grid item xs={12}>
								<Stack
									width="100%"
									direction="row"
									alignItems="center"
									justifyContent={isMobile ? " flex-end" : "space-between"}>
									<Typography fontWeight="bold" color="primary">
										Movie App
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Grid>

			<Grid item xs={12} mt={6}>
				<main style={{ width: "100%" }}>
					<Toolbar />
					<Box p={4}>{children}</Box>
				</main>
			</Grid>
		</Grid>
	);
};

export default AppLayout;
