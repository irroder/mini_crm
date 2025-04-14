import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import TopSearchBar from "./TopSearchBar";
import { Box } from "@mui/material";
import { useState } from "react";
// import { Menu as MenuIcon } from "@mui/icons-material";
// import IconButton from "@mui/material/IconButton";

export default function Layout() {
	// const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<Sidebar
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
				{/* <TopSearchBar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </TopSearchBar> */}
				<Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}
