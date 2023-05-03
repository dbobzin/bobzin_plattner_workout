import React, { useState, useEffect } from "react";
import BrowseWorkoutDetail from "../components/BrowseWorkoutDetail";

function Browse() {
  const [workouts, setWorkouts] = useState([]);
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")
  const [type, setType] = useState("-1");
  const [muscle, setMuscle] = useState("-1");
  const [difficulty, setDifficulty] = useState("-1");

  const fetch10 = (newPage) => {
    setPage(newPage)
    const offset = (newPage - 1) * 10
    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=&offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "QiFIfwuumJrsvnqt+Lvyvw==1l0oVWYG2ZKOwIcZ"
      }
    })
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error(error));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  useEffect(() => {
    fetch10(page);
  }, [page]);

  return (
    <div>
      <h1 className="mt-3">Browse Workouts</h1>
      <div className="col list-group">
        {workouts &&
          workouts.map((workout, index) => (
            <BrowseWorkoutDetail key={index} workout={workout} />
          ))}
      </div>
      <ul className="pagination my-3">
        <li className={`page-item ${page===1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => fetch10(page-1)}>&laquo;</button>
        </li>
        {page>2 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page-2)}>{page-2}</button>
        </li>}
        {page>1 && <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page-1)}>{page-1}</button>
        </li>}
        <li className="page-item active">
          <button className="page-link" onClick={() => fetch10(page)}>{page}</button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page+1)}>{page+1}</button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page+2)}>{page+2}</button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => fetch10(page+1)}>&raquo;</button>
        </li>
      </ul>
    </div>
  );
}

export default Browse;
