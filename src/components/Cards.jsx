import React, { useState } from "react";
import { Card, CardMedia, Typography, Modal, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import errorImg from "../assets/images/errorImg.png";

const Cards = ({ title, poster, year, type, imdbId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleErrorImages = (e) => {
    e.target.src = errorImg;
  };
  return (
    <>
      <Card
        sx={{
          width: 250,
          height: 650,
          borderRadius: 4,
        }}
      >
        <CardMedia
          onClick={handleOpen}
          component="img"
          height="auto"
          image={poster}
          alt={title}
          onError={handleErrorImages}
          sx={{ marginBottom: 3, cursor: "pointer" }}
          data-testid="imgOpen"
        />
        <Grid item>
          <Link
            style={{ textDecoration: "none", color: "#000000" }}
            to="/details"
            state={title}
            data-testid="linking-detail"
          >
            <Typography
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "blue",
                },
              }}
              gutterBottom
              variant="h5"
              data-testid="typography"
              component="div"
            >
              {title}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            Year: {year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            IMDB ID: {imdbId}
          </Typography>
        </Grid>
      </Card>
      <Modal
        sx={{
          width: 500,
          margin: "0 auto",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <CardMedia
          component="img"
          width={500}
          image={poster}
          onError={handleErrorImages}
          alt={title}
          sx={{ marginBottom: 3 }}
        />
      </Modal>
    </>
  );
};
Cards.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  year: PropTypes.string,
  type: PropTypes.string,
  imdbId: PropTypes.string,
};
export default Cards;
