import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e293b', // Темно-синий для сайдбара
        },
        secondary: {
            main: '#334155', // Акцентный цвет
        },
        background: {
            default: '#f8fafc', // Светлый фон контента
        },
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        padding: '8px 16px',
                    },
                },
            },
        },
    },
});

export default theme;
