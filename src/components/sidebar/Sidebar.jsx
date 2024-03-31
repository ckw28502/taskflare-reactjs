import { Box, Divider, Drawer, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import LanguageSelectComponent from "../LanguageSelectComponent";
import { useTranslation } from "react-i18next";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarItem from "./SidebarItem";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import DarkModeSwitchComponent from "../DarkModeSwitchComponent";

function Sidebar() {
    const theme = useTheme();

    const { t } = useTranslation();

    const dashboardItems = [{
        text: t("sidebar.DASHBOARD"),
        icon: <DashboardIcon />
    }]

    const projectItems = [
        {
            text: t("sidebar.PROJECT_CREATE"),
            icon: <AddIcon />
        },
        {
            text: t("sidebar.PROJECT_LIST"),
            icon: <ListIcon />
        }
    ]

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [isOpen, setIsOpen] = useState(false);

    function handleToggleDrawer() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggleDrawer}
                sx={{ 
                    display: { 
                        sm: 'block', 
                        md: 'none'
                    } 
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={isMobile ? isOpen : true}
                onClose={handleToggleDrawer}
                variant={isMobile ? "temporary" : "persistent"}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Box sx={{
                    py: "100 px"
                }}>
                    <Box sx={{
                        position:"relative",
                        marginBottom: "30px"
                    }}>
                        <Box sx={{
                            alignSelf: "end",
                            position: "absolute",
                            right: "2%",
                        }}>
                            <LanguageSelectComponent />
                        </Box>
                    </Box>
                    <Toolbar />
                    <Divider />
                    <SidebarItem items={dashboardItems} /> 
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginY: "1%"
                    }}>
                        <Typography variant="h6" fontWeight="bold">{t("sidebar.PROJECT")}</Typography>
                    </Box>
                    <Divider />   
                    <SidebarItem items={projectItems} /> 
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center", 
                        marginY: "20%"
                    }}>
                    <DarkModeSwitchComponent /> 
                    </Box>    
                </Box>  
            </Drawer>
        </>
    )
}

export default Sidebar;