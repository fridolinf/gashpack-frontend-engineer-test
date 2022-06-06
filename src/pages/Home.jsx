import React from "react";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Autocomplete, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesByKeyword,
  requestMoviesByKeyword,
} from "../redux/actions/moviesAction";
import api from "../utils/api/baseUrl";

const getScrollDownPercentage = (window) => {
  const pageHeight = window.document.documentElement.scrollHeight;
  const clientHeight = window.document.documentElement.clientHeight;
  const scrollPos = window.pageYOffset;
  const currentPosition = scrollPos + clientHeight;
  const percentageScrolled = currentPosition / pageHeight;
  return percentageScrolled;
};

const Home = () => {
  const [searchData, setSearchData] = useState("marvel");
  const [isAlert, setIsAlert] = useState(false);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(10);

  const homeSelector = useSelector((state) => state.moviesReducer);
  const dispatch = useDispatch();
  const handleScroll = () => {
    let percentageScrolled = getScrollDownPercentage(window);
    if (percentageScrolled > 0.8) {
      const nextPage = pages + 1;
      setPages(nextPage);
    }
  };
  const get = async () => {
    dispatch(requestMoviesByKeyword());
    try {
      let res = await axios.get(`${api.BASE_URL}s=${searchData}&page=${pages}`);
      if (res.status === 200) {
        let data = res.data;
        const concatData = homeSelector.movies.concat(data.Search);
        const result = concatData.reduce((prev, curr) => {
          if (!prev.some((obj) => obj?.imdbID === curr?.imdbID)) {
            prev.push(curr);
          }
          return prev;
        }, []);
        dispatch(getMoviesByKeyword(result));
        setTimeout(() => {
          setCount(data.totalResults);
        }, 500);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (count > 5) {
      window.onscroll = handleScroll;
      get();
    }
  }, [pages]);

  useEffect(() => {
    get();
  }, [searchData]);

  const searchValue = (e, value) => {
    dispatch(getMoviesByKeyword([]));
    setPages(1);
    if (value?.length < 3) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 1000);
    } else if (value?.length === undefined) {
      setSearchData("marvel");
    } else {
      setSearchData(value);
    }
  };
  return (
    <>
      {isAlert ? (
        <Alert variant="filled" severity="error">
          Please fill the form min 3 characters
        </Alert>
      ) : null}
      <Autocomplete
        freeSolo
        sx={{
          width: 400,
          background: "white",
          marginTop: 5,
          marginBottom: 5,
          borderRadius: 1,
        }}
        autoSelect
        data-testid="autocomplete"
        onChange={searchValue}
        options={homeSelector.movies?.map((option) =>
          option !== undefined ? option?.Title : "NO DATA"
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={searchData}
            placeholder="Search..."
            data-testid="text-field"
          />
        )}
      />
      <Grid
        container
        justifyContent="center"
        columns={{ xs: 3, sm: 13, md: 14 }}
      >
        {homeSelector?.movies.length > 0 ? (
          homeSelector?.movies?.map((data) =>
            data !== undefined ? (
              <Grid
                item
                key={data.imdbID}
                xs={2}
                sm={5}
                md={3}
                marginTop={3}
                data-testid="card-test"
              >
                <Cards
                  key={data.imdbID}
                  title={data?.Title ? data.Title : null}
                  poster={data?.Poster ? data.Poster : null}
                  type={data?.Type ? data.Type : null}
                  year={data?.Year ? data.Year : null}
                  imdbId={data?.imdbID ? data.imdbID : null}
                />
              </Grid>
            ) : null
          )
        ) : (
          <div>
            <h1>DATA NOT FOUND</h1>
          </div>
        )}
      </Grid>
    </>
  );
};

export default Home;
