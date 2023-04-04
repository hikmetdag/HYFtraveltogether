import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function CardMui({ title, img, description, linkedIn, github }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        background: "rgba(255,255,255,0.1)",
        color: "white",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardMedia component="img" alt="person" height="240" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ color: "white" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          <a href={linkedIn} target="_blank" rel="noreferrer">
            <LinkedInIcon style={{ color: "white" }} />
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            <GitHubIcon style={{ color: "white" }} />
          </a>
        </div>
      </CardActions>
    </Card>
  );
}

CardMui.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  linkedIn: PropTypes.string,
  github: PropTypes.string,
  description: PropTypes.string,
};
