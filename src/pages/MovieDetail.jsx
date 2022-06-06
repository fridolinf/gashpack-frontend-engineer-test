import {
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import api from "../utils/api/baseUrl";
import errorImg from "../assets/images/errorImg.png";
import {
  getMoviesByTitle,
  requestMoviesByTitle,
} from "../redux/actions/moviesAction";

const MovieDetail = () => {
  const location = useLocation();
  const title = location.state;

  const dispatch = useDispatch();
  const homeSelector = useSelector((state) => state.moviesReducer);
  const get = async () => {
    dispatch(requestMoviesByTitle());
    try {
      let res = await axios.get(`${api.BASE_URL}t=${title}&plot=full`);
      if (res.status === 200) {
        console.log(res, "REs?");
        let data = res.data;
        dispatch(getMoviesByTitle(data));
      }
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    get();
  }, [title]);

  const {
    Poster,
    Title,
    Actors,
    Awards,
    Country,
    DVD,
    Director,
    Genre,
    Language,
    Plot,
    Released,
    Writer,
    Year,
    imdbRating,
  } = homeSelector.movie;

  const handleErrorImages = (e) => {
    e.target.src = errorImg;
  };
  return (
    <>
      {homeSelector.loading ? (
        <CircularProgress
          size={50}
          sx={{ marginTop: "5%" }}
          color="warning"
          data-testid="loading"
        />
      ) : (
        <>
          <Link to="/" data-testid="to-home">
            <Button>Back to home</Button>
          </Link>
          <Grid container justifyContent="center">
            <Grid item xs={5} sm={5} md={2.5}>
              <CardMedia
                component="img"
                height="auto"
                image={Poster}
                onError={handleErrorImages}
                alt={Title}
                sx={{ marginBottom: 3, cursor: "pointer" }}
              />
            </Grid>
            <Grid item xs={5} sm={6} md={6} textAlign="start" marginLeft={3}>
              <Typography variant="h5">Actors: {Actors}</Typography>
              <Typography variant="p" fontSize="20px">
                Year: {Year}
              </Typography>
              <Typography>Awards: {Awards}</Typography>
              <Typography>Country: {Country}</Typography>
              <Typography>DVD: {DVD}</Typography>
              <Typography>Writer: {Writer}</Typography>
              <Typography>Director: {Director}</Typography>
              <Typography>Genre: {Genre}</Typography>
              <Typography>Language: {Language}</Typography>
              <Typography variant="subtitle2">Plot: {Plot}</Typography>
              <Typography>Release: {Released}</Typography>
              <Typography>
                Rating: <span style={{ color: "yellow" }}>{imdbRating}</span>
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

MovieDetail.propTypes = {
  Title: PropTypes.string,
  Poster: PropTypes.string,
  Year: PropTypes.string,
  Actors: PropTypes.string,
  Awards: PropTypes.string,
  Country: PropTypes.string,
  DVD: PropTypes.string,
  Director: PropTypes.string,
  Genre: PropTypes.string,
  Language: PropTypes.string,
  Plot: PropTypes.string,
  Released: PropTypes.string,
  Writer: PropTypes.string,
  imdbRating: PropTypes.string,
};

export default MovieDetail;
