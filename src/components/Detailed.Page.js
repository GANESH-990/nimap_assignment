import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { CastCard } from "./PosterCard";
const APIKEY = process.env.APIKEY;

export default function DetailedPage() {
  const data = useLocation();
  const movieID = data.state.id;
  const posterURL = `https://image.tmdb.org/t/p/w500`;

  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);

  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKEY}&language=en-US`;
  const castURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${APIKEY}&language=en-US`;

  async function getMovieDetail() {
    axios
      .get(movieDetailsURL)
      .then((res) => {
        setMovieDetails(res.data);
      })
      .catch((e) => console.log(e));
  }

  async function getCast() {
    axios
      .get(castURL)
      .then((res) => {
        setCastDetails(res.data.cast);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getMovieDetail();
    getCast();
  }, [data]);

  return (
    <>
      {movieDetails !== null && movieDetails !== undefined ? (
        <div>
          <div className="rounded mt-2 col-lg-11 col-12 d-flex flex-wrap flex-sm-row flex-column mx-auto bg-secondary">
            <div className=" col-lg-6 col-12  p-3    mx-auto">
              <div className=" d-flex gap-2">
                <div className="col-3 p-1">
                  <img
                    className="img-fluid"
                    src={posterURL + movieDetails.poster_path}
                    alt={movieDetails.title}
                  ></img>
                </div>
                <div className=" d-flex flex-column gap-2 ">
                  <span className=" display-c2">{movieDetails.title}</span>
                  <span className="display-f5">
                    Rating:{movieDetails.vote_average.toFixed(1)}
                  </span>
                  <div className="d-flex flex-wrap  gap-2">
                    <span className="border rounded px-2">
                      {movieDetails.runtime} min
                    </span>
                    <span className="text-wrap">
                      {movieDetails.genres.reduce((total, current, index) => {
                        if (index !== 0) {
                          return total + ", " + current.name;
                        } else {
                          return current.name;
                        }
                      }, "")}
                    </span>
                  </div>

                  <span>Release Date : {movieDetails.release_date}</span>
                </div>
              </div>

              <div>
                <span className="display-c2">Overview</span>
                <p>{movieDetails.overview}</p>
              </div>
            </div>

            <div className=" col-lg-6  col-12  rounded d-flex justify-content-lg-end  justify-content-center">
              <img
                className=" w-100"
                // style={{ width: "900px" }}
                src={posterURL + movieDetails.backdrop_path}
                alt={movieDetails.title}
              ></img>
            </div>
          </div>

          <div className="px-2">
            <p className="display-c2">Cast</p>

            <div className=" row gy-3 mx-sm-3">
              {castDetails !== null &&
                castDetails.map((item, index) => (
                  <div key={index} className="col-lg-2 col-sm-3 col-4">
                    <CastCard cast={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
