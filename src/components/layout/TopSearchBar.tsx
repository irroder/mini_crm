import { Input, IconButton, Box } from '@mui/material';
import { Search as IconSearch } from '@mui/icons-material';

interface TopSearchBarProps {
    children?: React.ReactNode;
}

export default function TopSearchBar({ children }: TopSearchBarProps) {
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid #e2e8f0',
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {children}
            <Input
                placeholder="Поиск ответа по базе знаний"
                sx={{ maxWidth: 500, flexGrow: 1 }}
                startAdornment={
                    <IconButton size="small" sx={{ mr: 1 }}>
                        <IconSearch fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
}
