import { Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import TicketsPage from "./pages/TicketsPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import UsersPage from "./pages/UsersPage";
import ClientsPage from "./pages/ClientsPage";
import AssetsPage from "./pages/AssetsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<TicketsPage />} />
				<Route path="knowledge-base" element={<KnowledgeBasePage />} />
				<Route path="users" element={<UsersPage />} />
				<Route path="clients" element={<ClientsPage />} />
				<Route path="assets" element={<AssetsPage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
}

export default App;
