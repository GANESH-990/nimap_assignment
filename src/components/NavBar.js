import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
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

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-navBar navbar-dark col-12 px-sm-c2 px-c1 d-flex ">
        <span className="navbar-brand">MovieDb</span>

        <button
          className="navbar-toggler bg-dark"
          type="button"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}  justify-content-end me-c4`}>
          <ul className="navbar-nav my-2">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Popular
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/topRated" className="nav-link">
                Top Rated
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/upcomingMovies" className="nav-link">
                Upcoming
              </Link>
            </li>
          </ul>

          <div className=" d-flex gap-2 mx-md-2 mx-0 nav-item ">
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
              class="btn btn-secondary"
              type="submit"
              onClick={() => {
                if(searchQuery!== ""){
                    searchMovie();
                }
                
              }}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="position-absolute w-100" style={{ zIndex: 99 }}>
        {searchedResult !== null && searchedResult !== undefined ? (
          <div
            className="list-group col-sm-8 col-11 mx-auto border border-light"
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
                  setExpanded(false);
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
  );
}
