import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedResult, setSearchedResult] = useState(null);

  const APIKEY = "c45a857c193f6302f2b5061c3b85e743";
  const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${searchQuery}&page=1`;

  async function searchMovie() {
    if (searchAPI !== "" && searchAPI !== undefined) {
      axios
        .get(searchAPI)
        .then((res) => {
          setSearchedResult(res.data.results);
        })
        .catch((e) => console.log(e));
    }
  }

  return (
    <>
      <div className=" bg-navBar py-2 position-relative">
        <div className=" col-10 mx-auto d-flex">
          <div className="col-6 d-flex align-items-center  display-f6">
            MovieDb
          </div>

          <div className="col-6 d-flex  align-items-center">
            <div className="d-flex gap-c1">
              <Link to="/">Popular</Link>
              <Link to="/topRated">Top Rated</Link>
              <Link to="/upcomingMovies">Upcoming </Link>
            </div>

            <div className=" d-flex gap-2 mx-2 ">
              <input
                class="form-control"
                type="search"
                placeholder="Movie Name"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onClick={() => {
                  if (searchQuery !== "") {
                    setSearchQuery("");
                    setSearchedResult(null);
                  }
                }}
                on
              />
              <button
                class="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={() => {
                  searchMovie();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="position-absolute w-100" style={{ zIndex: 99 }}>
          {searchedResult !== null && searchedResult !== undefined ? (
            <div
              className="list-group col-8 mx-auto border border-light"
              onBlur={() => searchedResult(null)}
            >
              {searchedResult.map((item, index) => (
                <Link
                  to="/detailedPage"
                  state={item}
                  key={index}
                  onClick={async () => {
                    console.log("presssed");
                    setSearchQuery("");
                    await setSearchedResult(null);
                    console.log(searchedResult);
                  }}
                >
                  <li className="list-group-item opacity-75">{item.title}</li>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
