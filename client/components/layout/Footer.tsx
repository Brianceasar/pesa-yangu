import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Link as Muilink,
    Grid
} from "@mui/material";
import Link from "next/link";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "primary.main", color: "white", py: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Pesa Yangu
                        </Typography>
                        <Typography variant="body2">
                            Empowering you financially, one step at a time.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Muilink component={Link} href="/" color="inherit">
                            Home
                        </Muilink>
                        <br />
                        <Muilink component={Link} href="/mentor" color="inherit">
                            Mentors
                        </Muilink>
                        <br />
                        <Muilink component={Link} href="/resources" color="inherit">
                            Resources
                        </Muilink>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            size="small"
                            sx={{ mb: 1 }}
                        />
                        <Button variant="contained" color="secondary">
                            Subscribe
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        {/* Social media links can be added here */}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Pesa Yangu. All rights reserved.
                </Typography>
            </Box>
        </Box>  
    )}
export default Footer;