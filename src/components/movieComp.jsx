//This is the component of the movies in the square 
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_KEY, API_URL } from "./url";
import MainMovie from "./mainMovie.jsx";
import MediaList from "./MediaList.jsx";
import "../CSS/square.css";

function MoviesComp({ selectedMovie, setSelectedMovie }) {
  //state que almacenara el array de respuestas de data.results
  const [allResults, setAllResults] = useState([]);
  //state que funcionara para cambiar las páginas
  const [currentPage, setCurrentPage] = useState(1);
  //Variable que nos permitira operar según el número de peliculas que queramos mostrar por pagina en la sección MovieList
  const moviesPerPage = 8;

  useEffect(() => {
    //Function to fetch the API, in this case the popular movies
    const fetchPopMovies = async () => {
      try {
        const initialResponse = await axios.get(`${API_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
          },
        });

        const totalPages = 15;
        const results = initialResponse.data.results;
        //requirement of 15 pages of 20 elements each (movies)
        const requests = [];
        for (let page = 2; page <= totalPages; page++) {
          requests.push(
            axios.get(`${API_URL}/movie/popular`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: page,
              },
            })
          );
        }
        //Ejecuta todas la promise en una sola para mejorar performance, las almacena en const para luego hacer un map de todas las respuestas del axios
        const responses = await Promise.all(requests);
        //se genera un nuevo array de arrays con la función .map() donde se guardaran las información de la respuesta de data especificamente data.results
        const allPageResults = responses
          .map((response) => response.data.results)
          //.flat() es una función que aplana los array, es decir que al array resultante del map, que era un array de otros array y los almacena todos en un solo array
          .flat();
        //Guarda en la vaiable allMovies un array que contiene otros dos array, que son copias (operador spread) de los array results que contiene la página 1 de la respuesta del axios y allPageResults que contiene todas las páginas de la 2 hasta la 15 para luego modificar el state y almacenar toda la información en el
        const allMovies = [...results, ...allPageResults];
        setAllResults(allMovies);

        //Generate a random movie for the main component
        const randomMovie =
          allMovies[Math.floor(Math.random() * allMovies.length)];
        setSelectedMovie(randomMovie);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchPopMovies();
  }, []);

  //generating the pagination
  //Esta variable almacenara el indice de la última pelicula que se mostrara por pagina
  const indexOfLastMovie = currentPage * moviesPerPage;
  //>Esta variable almacenara el indice de la primer pélicula que se muestre en alguna pagina
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  //Generara un subconjunto de elementos del array allresults donde mostrara desde el indice del primer elemento de la página, hasta, pero sin incluir el indice del último
  const currentMovies = allResults.slice(indexOfFirstMovie, indexOfLastMovie);
  //La función Math.ceil redondea un número, en este caso redondeara el de la división de el total de elementos del array allResults por las peliculas que se mostraran por cada página y eso lo almacenara en la variable totalPageMovies
  const totalPagesMovies = Math.ceil(allResults.length / moviesPerPage);

  return (
    <div>
      <div className="main-info">
        {selectedMovie ? (
          <MainMovie
            adult={selectedMovie.adult}
            title={selectedMovie.original_title}
            overview={selectedMovie.overview}
            posterPath={selectedMovie.poster_path}
            //Este id es esencial para uso de la API de youtube para mostrar el trailer para eso le pasamos la prop al mainMovie
            movieId={selectedMovie.id}
          />
        ) : (
          <p>Cargando película...</p>
        )}
      </div>
      <h2 className="label">Popular Movies</h2>
      <MediaList
        currentItems={currentMovies}
        handleSelect={setSelectedMovie}
        nextPage={() => setCurrentPage(currentPage + 1)}
        prevPage={() => setCurrentPage(currentPage - 1)}
        currentPage={currentPage}
        totalPages={totalPagesMovies}
      />
    </div>
  );
}
//specifying types of passed props
MoviesComp.propTypes = {
  selectedMovie: PropTypes.shape({
    adult: PropTypes.bool,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
  setSelectedMovie: PropTypes.func.isRequired,
};

export default MoviesComp;
