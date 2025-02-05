import { Badge, Box, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export type MenuItemProps = {
    name: string;
    icon: React.ReactNode;
    path: string;
    onItemClick?: () => void;
};

const MenuItem = ({ name, icon, path, onItemClick }: MenuItemProps) => {
    const [badge, setBadge] = useState(0);
    const location = useLocation();
    const isActive = location.pathname === path;

    useEffect(() => {
        if (name === "Messages") {
            setBadge(1000)
            return () => {
            }
        }
    }, [name])

    return (
        <ListItem
            onClick={() => onItemClick?.()}
            component={Link}
            to={path}
            sx={{
                paddingBlock: 0,
                position: "relative",
                "&:before": {
                    content: '""',
                    width: 4,
                    height: "70%",
                    backgroundColor: isActive ? "primary.main" : "transparent",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    transition: "background-color 0.3s",
                },
                "&:hover:before": {
                    backgroundColor: "primary.main",
                },
            }}
        >
            <ListItemButton
                sx={{
                    color: isActive ? "primary.main" : "text.disabled",
                    backgroundColor: isActive ? "secondary.light" : "transparent",
                    transition: "background-color 0.3s",
                    "&:hover": {
                        backgroundColor: "secondary.light",
                        color: "primary.main",
                    },
                }}
            >
                {icon}
                <ListItemText
                    primary={
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography>{name}</Typography>

                            {badge > 0 && (
                                <Badge
                                    badgeContent={badge}
                                    color="primary"
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            minWidth: 20,
                                            height: 20,
                                            fontSize: 12,
                                            borderRadius: "9999px",
                                            mr: 1,
                                        },
                                    }}
                                />
                            )}
                        </Box>

                    }
                    sx={{
                        marginLeft: 1,
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuItem;
