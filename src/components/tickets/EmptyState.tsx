import { Box, Typography, Button } from '@mui/material';
import { Add as IconAdd } from '@mui/icons-material';

interface EmptyStateProps {
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    actionText,
    onAction,
}: EmptyStateProps) {
    return (
        <Box
            sx={{
                textAlign: 'center',
                p: 4,
                border: '1px dashed #e0e0e0',
                borderRadius: 1,
                backgroundColor: 'background.paper',
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {description}
            </Typography>
            {actionText && onAction && (
                <Button
                    startIcon={<IconAdd />}
                    onClick={onAction}
                    variant="contained"
                    color="primary"
                >
                    {actionText}
                </Button>
            )}
        </Box>
    );
}
