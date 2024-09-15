import Header from "./components/header";
import { useState } from "react";
import "./CSS/App.css";
import { API_KEY, API_URL } from "./components/url";
import axios from "axios";
import Square from "./components/square.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  //We generate the useState () for search functions
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsTv, setSearchResultsTv] = useState([]);
  const [searchResultsPerson, setSearchResultsPerson] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTv, setSelectedTv] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  //Search Functions:
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchKey) return;
    try {
      const response = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          language: "en-US",
          page: 1,
        },
      });
      setSearchResults(response.data.results);
      setSelectedMovie(response.data.results[0] || null);
    } catch (error) {
      console.log("Error searching movies: ", error);
    }
  };

  const searchTv = async (e) => {
    e.preventDefault();
    if (!searchKey) return;
    try {
      const response = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          language: "en-US",
          page: 1,
        },
      });
      setSearchResultsTv(response.data.results);
      setSelectedTv(response.data.results[0] || null);
    } catch (error) {
      console.log("Error searching movies: ", error);
    }
  };
  const searchPerson = async (e) => {
    e.preventDefault();
    if (!searchKey) return;
    try {
      const response = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          language: "en-US",
          page: 1,
        },
      });
      setSearchResultsPerson(response.data.results);
      setSelectedPerson(response.data.results[0] || null);
    } catch (error) {
      console.log("Error searching movies: ", error);
    }
  };

  return (
    <main>
      <div>
        <Header
          //We pass the search functions to each component
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          searchMovies={searchMovies}
          searchTv={searchTv}
          searchPerson={searchPerson}
        />
      </div>
      <div>
        <Square
          //we pass the modifiers too
          searchResults={searchResults}
          searchResultsTv={searchResultsTv}
          searchResultsPerson={searchResultsPerson}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          selectedTv={selectedTv}
          setSelectedTv={setSelectedTv}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
      </div>
      <Footer />
    </main>
  );
}

export default App;
