import { useState } from "react";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	Paper,
	Chip,
	Typography,
	TablePagination,
	TextField,
	Dialog,
	Select,
	MenuItem,
} from "@mui/material";
import { Add as IconAdd, FilterAlt as IconFilter } from "@mui/icons-material";
import EmptyState from "../components/tickets/EmptyState";
import TicketForm from "../components/tickets/TicketForm";
import TicketEditForm from "../components/tickets/TicketEditForm";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchTasks, createTask, updateTask } from "../api";
import { useAppContext } from "../context/AppContext.tsx";

// interface Task {
// 	id: number;
// 	name: string;
// 	description: string;
// 	comment: string;
// 	price: number;
// 	taskTypeId: number;
// 	statusId: number;
// 	priorityId: number;
// 	serviceId: number;
// 	resolutionDatePlan: string;
// 	tags: number[];
// 	initiatorId: number;
// 	executorId: number;
// 	executorGroupId: number;
// }

interface StatusOption {
	value: string;
	label: string;
	color:
		| "default"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
}

export default function TicketsPage() {
	const queryClient = useQueryClient();
	const { data: tasksData, isLoading } = useQuery("tasks", fetchTasks);
	const {
		statuses,
		priorities,
		tags,
		users,
		taskTypes,
		services,
		userGroups,
		isLoading: contextLoading,
	} = useAppContext();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [openCreateForm, setOpenCreateForm] = useState(false);
	const [openEditForm, setOpenEditForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState<any>(null);

	const createMutation = useMutation(createTask, {
		onSuccess: () => {
			queryClient.invalidateQueries("tasks");
			handleCloseCreateForm();
		},
	});

	const updateMutation = useMutation(updateTask, {
		onSuccess: () => {
			queryClient.invalidateQueries("tasks");
			handleCloseEditForm();
		},
		onError: (error) => {
			console.error("Ошибка при обновлении:", error);
		},
	});

	const handleCreateTicket = () => setOpenCreateForm(true);
	const handleCloseCreateForm = () => setOpenCreateForm(false);
	const handleCloseEditForm = () => setOpenEditForm(false);

	const handleEditTask = (task: any) => {
		setSelectedTask(task);
		setOpenEditForm(true);
	};

	const handleSaveNewTask = async ({ title, description }: any) => {
		const newTask = {
			name: title,
			description,
			statusId:
				statuses.find((s: any) => s.name === "Открыта")?.id || 64539,
			priorityId: priorities[0]?.id || 60448,
			serviceId: services[0]?.id || 52268,
			taskTypeId: taskTypes[0]?.id || 52269,
			initiatorId: users[0]?.id || 52270,
			executorId: users[1]?.id || 52269,
			executorGroupId: userGroups[0]?.id || 52268,
			resolutionDatePlan: new Date().toISOString(),
			tags: [tags[0]?.id || 60446],
			price: 0,
			comment: "",
		};

		await createMutation.mutateAsync(newTask);
	};

	const handleUpdateTask = async (updatedTask: any) => {
		try {
			const taskToUpdate = {
				id: updatedTask.id,
				name: updatedTask.name,
				description: updatedTask.description,
				comment: "",
				price: 0,
				taskTypeId: updatedTask.taskTypeId,
				statusId: updatedTask.statusId,
				priorityId: updatedTask.priorityId,
				serviceId: updatedTask.serviceId,
				resolutionDatePlan: updatedTask.resolutionDatePlan,
				tags: Array.isArray(updatedTask.tags)
					? updatedTask.tags.map((t: any) =>
							typeof t === "object" ? t.id : t
					  )
					: [],
				initiatorId: updatedTask.initiatorId,
				executorId: updatedTask.executorId,
				executorGroupId: updatedTask.executorGroupId,
			};

			// console.log("Sending to server:", taskToUpdate);
			const response = await updateMutation.mutateAsync(taskToUpdate);
			return response;
		} catch (error) {
			console.error("Ошибка при обновлении задачи:", error);
			throw error;
		}
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filteredTasks = (tasksData?.value || []).filter((task: any) => {
		const matchesSearch = task.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || task.statusId.toString() === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const visibleTasks = filteredTasks.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	if (isLoading || contextLoading) {
		return <Typography>Загрузка...</Typography>;
	}

	const statusOptions: StatusOption[] = (statuses || []).map(
		(status: any) => ({
			value: status.id.toString(),
			label: status.name,
			color: getStatusColor(status.rgb),
		})
	);

	function getStatusColor(rgb: string): StatusOption["color"] {
		switch (rgb) {
			case "#fd5e53":
				return "error";
			case "#fcad51":
				return "warning";
			case "#3cb371":
				return "success";
			case "#025969":
				return "info";
			default:
				return "default";
		}
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h5"
					component="h1"
					sx={{ fontWeight: 500 }}
				>
					Заявки
				</Typography>
				<Button
					startIcon={<IconAdd />}
					onClick={handleCreateTicket}
					variant="contained"
					color="primary"
				>
					Создать заявку
				</Button>
			</Box>

			<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
				<TextField
					placeholder="Поиск по названию"
					size="small"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					sx={{ width: 300 }}
				/>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<IconFilter color="action" />
					<Select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						size="small"
						sx={{ minWidth: 180 }}
					>
						<MenuItem value="all">Все статусы</MenuItem>
						{statusOptions.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</Box>
			</Box>

			{filteredTasks.length === 0 ? (
				<EmptyState
					title="Нет заявок"
					description={
						searchTerm || statusFilter !== "all"
							? "Попробуйте изменить параметры поиска"
							: "Создайте первую заявку"
					}
					actionText="Создать заявку"
					onAction={handleCreateTicket}
				/>
			) : (
				<TableContainer
					component={Paper}
					sx={{ border: "1px solid #e0e0e0" }}
				>
					<Table size="small">
						<TableHead sx={{ backgroundColor: "#f5f5f5" }}>
							<TableRow>
								<TableCell sx={{ fontWeight: 600 }}>
									ID
								</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>
									Название
								</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>
									Статус
								</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>
									Исполнитель
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{visibleTasks.map((task: any) => {
								const status = statusOptions.find(
									(s: any) =>
										s.value === task.statusId.toString()
								);
								return (
									<TableRow
										key={task.id}
										hover
										onClick={() => handleEditTask(task)}
										sx={{ cursor: "pointer" }}
									>
										<TableCell>{task.id}</TableCell>
										<TableCell sx={{ fontWeight: 500 }}>
											{task.name}
										</TableCell>
										<TableCell>
											{status && (
												<Chip
													label={status.label}
													color={status.color}
													size="small"
												/>
											)}
										</TableCell>
										<TableCell>
											{task.executorName}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={filteredTasks.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage="Строк на странице:"
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} из ${
								count !== -1 ? count : `больше чем ${to}`
							}`
						}
					/>
				</TableContainer>
			)}

			<Dialog
				open={openCreateForm}
				onClose={handleCloseCreateForm}
				maxWidth="md"
				fullWidth
			>
				<TicketForm
					onSave={handleSaveNewTask}
					onCancel={handleCloseCreateForm}
				/>
			</Dialog>

			<Dialog
				open={openEditForm}
				onClose={handleCloseEditForm}
				maxWidth="lg"
				fullWidth
			>
				{selectedTask && (
					<TicketEditForm
						task={selectedTask}
						statusOptions={statusOptions}
						priorityOptions={priorities || []}
						tagOptions={tags || []}
						userOptions={users || []}
						taskTypeOptions={taskTypes || []}
						serviceOptions={services || []}
						userGroupOptions={userGroups || []}
						onSave={handleUpdateTask}
						onCancel={handleCloseEditForm}
					/>
				)}
			</Dialog>
		</Box>
	);
}
