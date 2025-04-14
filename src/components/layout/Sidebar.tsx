import { Link, useLocation } from 'react-router-dom';
import {
    Book as IconBook,
    ConfirmationNumber as IconTicket, // Изменено с Ticket на ConfirmationNumber
    People as IconUsers, // Изменено с Users на People
    Store as IconBuildingStore,
    Settings as IconSettings,
    Close as IconClose,
} from '@mui/icons-material';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Drawer,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

export default function Sidebar({
    mobileOpen,
    handleDrawerToggle,
}: SidebarProps) {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navItems = [
        { path: '/', icon: IconTicket, label: 'Заявки' },
        { path: '/knowledge-base', icon: IconBook, label: 'База знаний' },
        { path: '/users', icon: IconUsers, label: 'Сотрудники' },
        { path: '/clients', icon: IconUsers, label: 'Клиенты' },
        { path: '/assets', icon: IconBuildingStore, label: 'Активы' },
        { path: '/settings', icon: IconSettings, label: 'Настройки' },
    ];

    const drawerContent = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid #334155',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Логотип
                </Typography>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{ color: 'white' }}
                    >
                        <IconClose />
                    </IconButton>
                )}
            </Box>
            <nav>
                <List>
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        borderRadius: 1,
                                        color: isActive ? 'white' : '#94a3b8',
                                        bgcolor: isActive
                                            ? '#334155'
                                            : 'transparent',
                                        '&:hover': {
                                            bgcolor: isActive
                                                ? '#334155'
                                                : '#1f2937',
                                        },
                                        px: 3,
                                        py: 1,
                                        my: 0.5,
                                    }}
                                    onClick={
                                        isMobile
                                            ? handleDrawerToggle
                                            : undefined
                                    }
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive
                                                ? 'white'
                                                : '#94a3b8',
                                            minWidth: 40,
                                        }}
                                    >
                                        <IconComponent fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </nav>
        </>
    );

    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        bgcolor: '#1e293b',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    return (
        <Box
            sx={{
                width: 240,
                bgcolor: '#1e293b',
                color: 'white',
                borderRight: '1px solid #e2e8f0',
                position: 'sticky',
                top: 0,
                height: '100vh',
            }}
        >
            {drawerContent}
        </Box>
    );
}
