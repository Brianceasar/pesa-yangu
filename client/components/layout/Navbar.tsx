"use client";

import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton
} from "@mui/material";
import { useContext,useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        auth?.logout();
        handleMenuClose();
        router.push("/");
    };

    return(
        <AppBar position="sticky" color="primary" sx={{ bgcolor: "primary.main" }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography 
                        variant="h6"
                        noWrap
                        onClick={() => router.push("/")}
                        sx={{ cursor: "pointer", flexGrow: 1, fontWeight: 700 }}
                    >
                        Pesa Yangu
                    </Typography>

                    {!auth?.user ?(
                        <Box>
                            <Button 
                                color="inherit" 
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => router.push("/register")}
                            >
                                Register
                            </Button>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body1">{auth.user.username}</Typography>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar alt={auth.user.username} />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={() => { handleMenuClose(); router.push("/profile"); }}>Account Settings </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
