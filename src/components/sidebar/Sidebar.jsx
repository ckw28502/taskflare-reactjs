import { Box, Divider, Drawer, Grid, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import LanguageSelectComponent from "../LanguageSelectComponent";
import { useTranslation } from "react-i18next";
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import SidebarItem from "./SidebarItem";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import DarkModeSwitchComponent from "../DarkModeSwitchComponent";

function Sidebar() {
    const theme = useTheme();

    const { t } = useTranslation();

    const items = [
        {
            text: t("sidebar.PROJECTS"),
            icon: <ListIcon />,
            href: "/"
        },
        {
            text: t("sidebar.SETTINGS"),
            icon: <SettingsIcon />,
            href: "/settings"
        },
        {
            text: t("sidebar.HELP"),
            icon: <HelpIcon />,
            href: "/help"
        }
    ]

    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const [isOpen, setIsOpen] = useState(false);

    function handleToggleDrawer() {
        setIsOpen(!isOpen);
    }

    return (
        <Grid item xs={2}>
            <Box sx={{
                display: {
                    md: "none",
                    sm: "block"
                },
                margin: 2
            }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleToggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
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
                        marginBottom: "30px",
                        py: 1
                    }}>
                        <Box sx={{
                            alignSelf: "end",
                            position: "absolute",
                            right: 0,
                        }}>
                            <Box sx={{
                                display: {
                                    md: "none",
                                    sm: "block"
                                }
                            }}>
                                <Box display="flex" justifyContent="flex-end">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={handleToggleDrawer}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box>
                                <LanguageSelectComponent />
                            </Box>
                        </Box>
                    </Box>
                    <Toolbar />
                    <Divider />
                    <SidebarItem items={items} /> 
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginY: "1%"
                    }}>
                    </Box>
                    <Divider />   
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center", 
                        marginY: "20%"
                    }}>
                    <DarkModeSwitchComponent /> 
                    </Box>    
                </Box>  
            </Drawer>
        </Grid>
    )
}

export default Sidebar;