import { useState } from "react";
import {
	Box,
	TextField,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

export default function TicketForm({ onSave, onCancel }: any) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		onSave({ title, description });
	};

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<DialogTitle>Создание новой заявки</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Название заявки"
					fullWidth
					variant="outlined"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<TextField
					margin="dense"
					label="Описание"
					fullWidth
					multiline
					rows={4}
					variant="outlined"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Отмена</Button>
				<Button type="submit" variant="contained" color="primary">
					Сохранить
				</Button>
			</DialogActions>
		</Box>
	);
}
