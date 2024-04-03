import { useState, useEffect } from "react";
import axios from "axios";

import PosterCard from "./PosterCard";

const APIKEY = "c45a857c193f6302f2b5061c3b85e743";
const all_movies_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;

export default function Home() {
  const [data, setData] = useState(null);

  async function getTopRated() {
    axios
      .get(all_movies_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTopRated();
  }, []);

  return (
    <>
      <div className=" mx-auto col-md-10 col-12">
        {data !== undefined && data !== null ? (
          <div className="row">
            {data.results.map((item, index) => (
              <div key={index} className={`col-lg-2 col-sm-3 col-10`}>
                <PosterCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </>
  );
}
