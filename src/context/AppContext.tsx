import { createContext, useContext, ReactNode } from "react";
import {
	fetchPriorities,
	fetchStatuses,
	fetchTags,
	fetchTaskTypes,
	fetchUserGroups,
	fetchUsers,
	fetchServices,
} from "../api";
import { useQuery } from "react-query";

interface AppContextType {
	priorities: any[];
	statuses: any[];
	tags: any[];
	taskTypes: any[];
	userGroups: any[];
	users: any[];
	services: any[];
	isLoading: boolean;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const { data, isLoading } = useQuery("appData", async () => {
		const [
			priorities,
			statuses,
			tags,
			taskTypes,
			userGroups,
			users,
			services,
		] = await Promise.all([
			fetchPriorities(),
			fetchStatuses(),
			fetchTags(),
			fetchTaskTypes(),
			fetchUserGroups(),
			fetchUsers(),
			fetchServices(),
		]);

		return {
			priorities,
			statuses,
			tags,
			taskTypes,
			userGroups,
			users,
			services,
		};
	});

	return (
		<AppContext.Provider
			value={{
				priorities: data?.priorities || [],
				statuses: data?.statuses || [],
				tags: data?.tags || [],
				taskTypes: data?.taskTypes || [],
				userGroups: data?.userGroups || [],
				users: data?.users || [],
				services: data?.services || [],
				isLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
