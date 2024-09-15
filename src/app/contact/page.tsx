"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
}));

const ContactWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: "100%",
}));

const ContactDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const ContactForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: "100%",
  height: "400px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[3],
}));

export default function Contact() {
  return (
    <Box margin={2}>
      <Typography variant="h2" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ContactWrapper>
            <SectionTitle variant="h5">Contact Details</SectionTitle>
            <ContactDetails>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="location" color="primary">
                  <LocationOnIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={2}>
                  123 Main St, San Francisco, CA 94105, USA
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="phone" color="primary">
                  <PhoneIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={2}>
                  +123 456 7890
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="email" color="primary">
                  <EmailIcon />
                </IconButton>
                <Typography variant="body1" marginLeft={2}>
                  contact@example.com
                </Typography>
              </Box>
            </ContactDetails>
          </ContactWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactWrapper>
            <SectionTitle variant="h5">Contact Form</SectionTitle>
            <ContactForm>
              <TextField label="Name" variant="outlined" fullWidth />
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary">
                Send Message
              </Button>
            </ContactForm>
          </ContactWrapper>
        </Grid>
      </Grid>
      <MapWrapper>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5433.505952448559!2d-122.39961957254721!3d37.79094732041645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806460081965%3A0x2d306f789e9b77c9!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e1!3m2!1sen!2sin!4v1725300511834!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </MapWrapper>
    </Box>
  );
}
