import React from "react";
import AppThemeProvider from "./theme/AppThemeProvider";
import AppLayout from "./layout/AppLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<AppThemeProvider>
			<SnackbarProvider>
				<Provider store={store}>
					<AppLayout>
						<RouterProvider router={router} />
					</AppLayout>
				</Provider>
			</SnackbarProvider>
		</AppThemeProvider>
	);
}

export default App;
