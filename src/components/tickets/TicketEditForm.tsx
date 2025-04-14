import { useState } from "react";
import {
	Box,
	TextField,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
	Select,
	MenuItem,
	Chip,
	Grid,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	FormControl,
	InputLabel,
} from "@mui/material";
import { Comment as CommentIcon } from "@mui/icons-material";

interface Comment {
	id: number;
	author: string;
	text: string;
	date: string;
}

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

interface TicketEditFormProps {
	task: any;
	statusOptions: StatusOption[];
	priorityOptions: any[];
	tagOptions: any[];
	userOptions: any[];
	taskTypeOptions: any[];
	serviceOptions: any[];
	userGroupOptions: any[];
	onSave: (task: any) => void;
	onCancel: () => void;
}

export default function TicketEditForm({
	task,
	statusOptions = [],
	priorityOptions = [],
	tagOptions = [],
	userOptions = [],
	taskTypeOptions = [],
	serviceOptions = [],
	userGroupOptions = [],
	onSave,
	onCancel,
}: TicketEditFormProps) {
	const [editedTask, setEditedTask] = useState<any>({ ...task });
	const [newComment, setNewComment] = useState("");

	const handleChange = (field: string, value: any) => {
		if (field === "tags") {
			const uniqueTags = Array.from(new Set(value));
			setEditedTask((prev: any) => ({ ...prev, [field]: uniqueTags }));
		} else {
			setEditedTask((prev: any) => ({ ...prev, [field]: value }));
		}
	};

	const handleAddComment = () => {
		if (!newComment.trim()) return;

		const comment: Comment = {
			id: Date.now(),
			author: "Текущий пользователь",
			text: newComment,
			date: new Date().toISOString(),
		};

		setEditedTask((prev: any) => ({
			...prev,
			comments: [...(prev.comments || []), comment],
		}));
		setNewComment("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const taskToSave = {
				...editedTask,
				tags:
					editedTask.tags?.map((t: any) =>
						typeof t === "object" ? t.id : t
					) || [],
				comment: "",
				price: 0,
			};
			await onSave(taskToSave);
		} catch (error) {
			console.error("Ошибка при сохранении:", error);
		}
	};

	const selectedTagIds =
		Array.from(
			new Set(
				editedTask.tags
					?.map((t: any) => t.id?.toString())
					.filter((id: string | undefined) => id !== undefined)
			)
		) || [];

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<DialogTitle sx={{ typography: "h6" }}>
				#{editedTask.id} - {editedTask.name}
			</DialogTitle>

			<DialogContent dividers>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						<TextField
							label="Название"
							fullWidth
							margin="normal"
							value={editedTask.name || ""}
							onChange={(e) =>
								handleChange("name", e.target.value)
							}
						/>

						<TextField
							label="Описание"
							fullWidth
							multiline
							rows={6}
							value={editedTask.description || ""}
							onChange={(e) =>
								handleChange("description", e.target.value)
							}
							margin="normal"
						/>

						<Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
							Комментарии
						</Typography>

						<List>
							{(editedTask.comments || []).map((comment: any) => (
								<Box key={`comment-${comment.id}`}>
									{" "}
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar>
												{comment.author.charAt(0)}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={comment.author}
											secondary={
												<>
													<Typography
														component="span"
														variant="body2"
														color="text.primary"
													>
														{new Date(
															comment.date
														).toLocaleString()}
													</Typography>
													<br />
													{comment.text}
												</>
											}
										/>
									</ListItem>
									<Divider variant="inset" component="li" />
								</Box>
							))}

							<Box sx={{ mt: 2, display: "flex", gap: 1 }}>
								<TextField
									fullWidth
									multiline
									rows={2}
									variant="outlined"
									placeholder="Добавить комментарий..."
									value={newComment}
									onChange={(e) =>
										setNewComment(e.target.value)
									}
								/>
								<Button
									variant="contained"
									onClick={handleAddComment}
									disabled={!newComment.trim()}
								>
									<CommentIcon />
								</Button>
							</Box>
						</List>
					</Grid>
					<Grid item xs={4}>
						<FormControl fullWidth margin="normal">
							<InputLabel>Статус</InputLabel>
							<Select
								value={editedTask.statusId?.toString() || ""}
								label="Статус"
								onChange={(e) =>
									handleChange(
										"statusId",
										parseInt(e.target.value)
									)
								}
							>
								{statusOptions.map((option) => (
									<MenuItem
										key={`status-${option.value}`}
										value={option.value}
									>
										<Chip
											label={option.label}
											color={option.color}
											size="small"
											sx={{ mr: 1 }}
										/>
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Тип задачи</InputLabel>
							<Select
								value={editedTask.taskTypeId?.toString() || ""}
								label="Тип задачи"
								onChange={(e) =>
									handleChange(
										"taskTypeId",
										parseInt(e.target.value)
									)
								}
							>
								{taskTypeOptions.map((option: any) => (
									<MenuItem
										key={`task-type-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Сервис</InputLabel>
							<Select
								value={editedTask.serviceId?.toString() || ""}
								label="Сервис"
								onChange={(e) =>
									handleChange(
										"serviceId",
										parseInt(e.target.value)
									)
								}
							>
								{serviceOptions.map((option: any) => (
									<MenuItem
										key={`service-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Приоритет</InputLabel>
							<Select
								value={editedTask.priorityId?.toString() || ""}
								label="Приоритет"
								onChange={(e) =>
									handleChange(
										"priorityId",
										parseInt(e.target.value)
									)
								}
							>
								{priorityOptions.map((option: any) => (
									<MenuItem
										key={`priority-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Группа исполнителей</InputLabel>
							<Select
								value={
									editedTask.executorGroupId?.toString() || ""
								}
								label="Группа исполнителей"
								onChange={(e) =>
									handleChange(
										"executorGroupId",
										parseInt(e.target.value)
									)
								}
							>
								{userGroupOptions.map((option: any) => (
									<MenuItem
										key={`user-group-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Заявитель</InputLabel>
							<Select
								value={editedTask.initiatorId?.toString() || ""}
								label="Заявитель"
								onChange={(e) =>
									handleChange(
										"initiatorId",
										parseInt(e.target.value)
									)
								}
							>
								{userOptions.map((option: any) => (
									<MenuItem
										key={`initiator-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth margin="normal">
							<InputLabel>Исполнитель</InputLabel>
							<Select
								value={editedTask.executorId?.toString() || ""}
								label="Исполнитель"
								onChange={(e) =>
									handleChange(
										"executorId",
										parseInt(e.target.value)
									)
								}
							>
								{userOptions.map((option: any) => (
									<MenuItem
										key={`executor-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label="Срок выполнения"
							type="datetime-local"
							fullWidth
							margin="normal"
							InputLabelProps={{ shrink: true }}
							value={
								editedTask.resolutionDatePlan?.split(".")[0] ||
								""
							}
							onChange={(e) =>
								handleChange(
									"resolutionDatePlan",
									e.target.value
								)
							}
						/>

						<FormControl fullWidth margin="normal">
							<InputLabel>Теги</InputLabel>
							<Select
								multiple
								value={selectedTagIds}
								label="Теги"
								onChange={(e) =>
									handleChange("tags", e.target.value)
								}
								renderValue={(selected) => (
									<Box
										sx={{
											display: "flex",
											flexWrap: "wrap",
											gap: 0.5,
										}}
									>
										{(selected as string[]).map(
											(value, index) => {
												const tag = tagOptions.find(
													(t: any) =>
														t.id.toString() ===
														value
												);
												return tag ? (
													<Chip
														key={`selected-tag-${tag.id}-${index}`}
														label={tag.name}
														size="small"
													/>
												) : null;
											}
										)}
									</Box>
								)}
							>
								{tagOptions.map((option: any) => (
									<MenuItem
										key={`tag-option-${option.id}`}
										value={option.id.toString()}
									>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Button onClick={onCancel}>Отмена</Button>
				<Button type="submit" variant="contained" color="primary">
					Сохранить изменения
				</Button>
			</DialogActions>
		</Box>
	);
}
