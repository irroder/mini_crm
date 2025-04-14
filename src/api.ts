const API_BASE_URL = "http://intravision-task.test01.intravision.ru/api";
const TENANT_GUID = "6a77c873-f831-4dff-89d3-e84c4a03ef48";

export const fetchPriorities = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Priorities`);
	return response.json();
};

export const fetchStatuses = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Statuses`);
	return response.json();
};

export const fetchTags = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Tags`);
	return response.json();
};

export const fetchTasks = async () => {
	const response = await fetch(
		`http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=${TENANT_GUID}`
	);
	return response.json();
};

export const fetchTaskTypes = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/TaskTypes`);
	return response.json();
};

export const fetchUserGroups = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/UserGroups`);
	return response.json();
};

export const fetchUsers = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Users`);
	return response.json();
};

export const fetchServices = async () => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Services`);
	return response.json();
};

export const createTask = async (taskData: any) => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(taskData),
	});
	return response.json();
};

export const updateTask = async (taskData: any) => {
	const response = await fetch(`${API_BASE_URL}/${TENANT_GUID}/Tasks`, {
		method: "PUT",
		headers: {
			"Content-Type":
				"application/json;odata.metadata=minimal;odata.streaming=true",
		},
		body: JSON.stringify(taskData),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText || "Failed to update task");
	}

	try {
		return await response.json();
	} catch (e) {
		return {};
	}
};
