import React, { useState, useEffect } from "react";

function Browse() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>My Workouts</h1>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            <p>{workout.duration} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Browse;
