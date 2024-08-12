import { useEffect, useState } from "react";
import axios from "axios";
import PersonMain from "./personMain";
import MediaList from "./MediaList";
import { API_KEY, API_URL } from "./url.jsx";
import PropTypes from "prop-types";

function PersonComponent({ selectedPerson, setSelectedPerson }) {
  const [allResultsPerson, setAllResultsPerson] = useState([]);
  const [currentPagePerson, setCurrentPagePerson] = useState(1);
  const perPerPage = 8;

  //Function to fetch the API, in this case the popular persons
  useEffect(() => {
    const fetchPopPerson = async () => {
      try {
        const initialResponse = await axios.get(
          `${API_URL}/trending/person/day`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              page: 1,
            },
          }
        );

        //requirement of 15 pages of 20 elements each (Person)
        const totalPages = 15;
        const resultsPerson = initialResponse.data.results;

        const requestsPerson = [];
        for (let page = 2; page <= totalPages; page++) {
          requestsPerson.push(
            axios.get(`${API_URL}/trending/person/day`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: page,
              },
            })
          );
        }

        const responsesPerson = await Promise.all(requestsPerson);
        const allPageResultsPerson = responsesPerson
          .map((responsePerson) => responsePerson.data.results)
          .flat();
        const allPerson = [...resultsPerson, ...allPageResultsPerson];
        setAllResultsPerson(allPerson);

        //Generate a random person for the main component
        const randomPerson =
          allPerson[Math.floor(Math.random() * allPerson.length)];
        setSelectedPerson(randomPerson);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchPopPerson();
  }, [setSelectedPerson]);

  //generating the pagination
  const indexOfLastPerson = currentPagePerson * perPerPage;
  const indexOfFirstPerson = indexOfLastPerson - perPerPage;
  const currentPerson = allResultsPerson.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );
  const totalPagesPerson = Math.ceil(allResultsPerson.length / perPerPage);

  return (
    <div>
      <div className="main-info-person">
        {selectedPerson ? (
          <PersonMain
            name={selectedPerson.original_name}
            known_for_department={selectedPerson.known_for_department}
            profile_path={selectedPerson.profile_path}
            known_for={selectedPerson.known_for}
            popularity={selectedPerson.popularity}
          />
        ) : (
          <p>Cargando persona...</p>
        )}
      </div>
      <h2 className="label">Popular Persons</h2>
      <MediaList
        currentItems={currentPerson}
        handleSelect={setSelectedPerson}
        nextPage={() => setCurrentPagePerson(currentPagePerson + 1)}
        prevPage={() => setCurrentPagePerson(currentPagePerson - 1)}
        currentPage={currentPagePerson}
        totalPages={totalPagesPerson}
      />
    </div>
  );
}
//specifying types of passed props

PersonComponent.propTypes = {
  selectedPerson: PropTypes.shape({
    original_name: PropTypes.string,
    known_for_department: PropTypes.string,
    overview: PropTypes.string,
    profile_path: PropTypes.string,
    id: PropTypes.number,
  }),
  setSelectedMovie: PropTypes.func.isRequired,
};

export default PersonComponent;
