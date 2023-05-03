import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import BrowseWorkoutDetail from "../components/BrowseWorkoutDetail";
import { BsSearch, BsFillExclamationTriangleFill } from "react-icons/bs";

function Browse() {
  const { user } = useAuthContext();
  const [workouts, setWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)
  const [name, setName] = useState("")
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  const fetch10 = (newPage) => {
    setPage(newPage)
    const offset = (newPage - 1) * 10
    fetch(`https://api.api-ninjas.com/v1/exercises?name=${name}&type=${type}&muscle=${muscle}&difficulty=${difficulty}&offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "QiFIfwuumJrsvnqt+Lvyvw==1l0oVWYG2ZKOwIcZ"
      }
    })
      .then((response) => response.json())
      .then((data) => {setWorkouts(data); setShowAlert(data && data.length < 1)})
      .catch((error) => console.error(error));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch("/api/workouts", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSavedWorkouts(data))
      .catch((error) => console.error(error));
    fetch10(page);
  }, [page, user]);

  return (
    <div>
      <div className="d-flex justify-content-between my-1">
        <h2 className="mt-2 mb-0">Browse Workouts</h2>
        {!showFilters && <button className="btn btn-success m-2 me-0" onClick={toggleFilters}>Filter Search</button>}
        {showFilters && <button className="btn btn-primary m-2 me-0" onClick={toggleFilters}>Hide Filters</button>}
      </div>
      {showFilters &&
        <div className="d-flex">
          <div className="row mb-3 flex-grow-1">
            <div className="col-sm-3 col-6 form-group">
              <label>Exercise name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control bg-secondary text-white"
                placeholder="Search..."
              />
            </div>
            <div className="col-sm-3 col-6 form-group">
              <label>Type</label>
              <select className="form-select bg-secondary text-white" value={type} onChange={e => setType(e.target.value)}>
                <option key={-1} value=""></option>
                <option key={0} value="cardio">Cardio</option>
                <option key={1} value="olympic Weightlifting">Olympic Weightlifting</option>
                <option key={2} value="plyometrics">Plyometrics</option>
                <option key={3} value="powerlifting">Powerlifting</option>
                <option key={4} value="strength">Strength</option>
                <option key={5} value="stretching">Stretching</option>
                <option key={6} value="strongman">Strongman</option>
              </select>
            </div>
            <div className="col-sm-3 col-6 form-group">
              <label>Muscle</label>
              <select className="form-select bg-secondary text-white" value={muscle} onChange={e => setMuscle(e.target.value)}>
                <option key={-1} value=""></option>
                <option key={0} value="abdominals">Abdominals</option>
                <option key={1} value="abductors">Abductors</option>
                <option key={2} value="adductors">Adductors</option>
                <option key={3} value="biceps">Biceps</option>
                <option key={4} value="calves">Calves</option>
                <option key={5} value="chest">Chest</option>
                <option key={6} value="forearms">Forearms</option>
                <option key={7} value="glutes">Glutes</option>
                <option key={8} value="hamstrings">Hamstrings</option>
                <option key={9} value="lats">Lats</option>
                <option key={10} value="lower_back">Lower back</option>
                <option key={11} value="middle_back">Middle back</option>
                <option key={12} value="neck">Neck</option>
                <option key={13} value="quadriceps">Quadriceps</option>
                <option key={14} value="traps">Traps</option>
                <option key={15} value="triceps">Triceps</option>
              </select>
            </div>
            <div className="col-sm-3 col-6 form-group">
              <label>Difficulty</label>
              <select className="form-select bg-secondary text-white" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option key={-1} value=""></option>
                <option key={0} value="beginner">Beginner</option>
                <option key={1} value="intermediate">Intermediate</option>
                <option key={2} value="expert">Expert</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-column-reverse mb-3">
            <button className="btn btn-success ms-3" onClick={() => fetch10(1)}><BsSearch className="mb-1" /></button>
          </div>
        </div>}
      <div className="col list-group">
        {workouts && workouts.map((workout, index) => (
          <BrowseWorkoutDetail key={index} workout={workout} savedWorkouts={savedWorkouts} />
        ))}
      </div>
      {showAlert && <div className="alert alert-warning">
        <div className="d-flex align-items-center">
          <h4><BsFillExclamationTriangleFill className="me-3" /></h4>
          <p className="mb-0"><strong>Uh-oh!</strong> There are no workouts matching your search criteria. Widen your search and try again.</p>
        </div>
      </div>}
      {workouts && (page > 1 || workouts.length>0) && <ul className="pagination my-3">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => fetch10(page - 1)}>&laquo;</button>
        </li>
        {page > 2 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page - 2)}>{page - 2}</button>
        </li>}
        {page > 1 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page - 1)}>{page - 1}</button>
        </li>}
        <li className="page-item active">
          <button className="page-link" onClick={() => fetch10(page)}>{page}</button>
        </li>
        {workouts && workouts.length>0 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page + 1)}>{page + 1}</button>
        </li>}
        {workouts && workouts.length>0 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page + 2)}>{page + 2}</button>
        </li>}
        <li className={`page-item ${workouts && workouts.length<1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => fetch10(page + 1)}>&raquo;</button>
        </li>
      </ul>}
    </div>
  );
}

export default Browse;
