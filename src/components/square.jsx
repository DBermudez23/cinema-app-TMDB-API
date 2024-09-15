import { Routes, Route } from "react-router-dom";
import MoviesComp from "./movieComp";
import TvComponent from "./tvComponent";
import "../CSS/square.css";
import PersonComponent from "./personComp";

function Square({
  //Receive the states to modify the main component to each of routes
  selectedMovie,
  setSelectedMovie,
  selectedTv,
  setSelectedTv,
  selectedPerson,
  setSelectedPerson,
}) {
  return (
    <div className="square-container">
      <Routes>
        <Route
          path="/"
          element={
            <MoviesComp
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          }
        />
        <Route
          path="/tv"
          element={
            <TvComponent
              selectedTv={selectedTv}
              setSelectedTv={setSelectedTv}
            />
          }
        />
        <Route
          path="/person"
          element={
            <PersonComponent
              selectedPerson={selectedPerson}
              setSelectedPerson={setSelectedPerson}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Square;

