import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App.tsx";
import theme from "./theme";
import { AppProvider } from "./context/AppContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<App />
				</AppProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</BrowserRouter>
);
