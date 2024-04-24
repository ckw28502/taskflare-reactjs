import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from "@mui/material";
import LanguageSelectComponent from "../LanguageSelectComponent";
import { useTranslation } from "react-i18next";
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@emotion/react";
import { useState } from "react";
import DarkModeSwitchComponent from "../DarkModeSwitchComponent";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const [isOpen, setIsOpen] = useState(false);

    function handleToggleDrawer() {
        setIsOpen(!isOpen);
    }

    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        navigate("/login");
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
                    <List>
                        <ListItem>
                            <ListItemButton component={Link} to="/">
                                <ListItemIcon><ListIcon /></ListItemIcon>
                                <ListItemText primary={t("sidebar.PROJECTS")} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => logout()}>
                                <ListItemIcon><Logout /></ListItemIcon>
                                <ListItemText primary={t("sidebar.LOGOUT")} />
                            </ListItemButton>
                        </ListItem>
                    </List>
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