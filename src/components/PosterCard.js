import { Link } from "react-router-dom";

export default function PosterCard({item}) {
  const posterURL = `https://image.tmdb.org/t/p/w300`;

  return (
    <>

    <Link to="/detailedPage" state={item}>
    <div className="  d-flex flex-column gap-2  display-f4 my-c1 py-c1 text-fontColor">
        <img src={posterURL + item.poster_path} alt={item.original_title}></img>
        <span>{item.original_title}</span>
        <span>Rating : {item.vote_average.toFixed(1)}</span>
      </div>
    
    </Link>

    </>
  );
}



export function CastCard( {cast} ){
    const posterURL = `https://image.tmdb.org/t/p/w300`;

    return(
        <>

        <div className=" col-12 d-flex flex-column gap-1 col-1">


            <div>
                <img src={ posterURL +  cast.profile_path} alt={cast.original_name} className="img-fluid"></img>
            </div>

            <div>{cast.name}</div>
            <div>Charecter: {cast.character}</div>
        </div>
        
        </>
    )
}