"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <Box>
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={700}>Your Journey to Financial Freedom</Typography>
          <Typography variant="h6" mt={2}>Mentorship and Resources to Help You Thrive</Typography>
          <Button variant="contained" color="secondary" size="large" sx={{ mt: 4 }} onClick={() => router.push("/register")}>
            Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600}>Learn from Trusted Mentors</Typography>
            <Typography mt={2}>Book sessions with experienced professionals and mentors ready to guide you.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600}>Access Valuable Resources</Typography>
            <Typography mt={2}>Browse our curated library of financial education materials.</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
