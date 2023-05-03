import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("-1");
  const [muscle, setMuscle] = useState("-1");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("-1");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, type, muscle, equipment, difficulty, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setType("-1");
      setMuscle("-1");
      setEquipment("");
      setDifficulty("-1");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <div className="form-group mb-2">
        <label>Exercise title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`form-control ${emptyFields.includes("title") ? "is-invalid" : ""}`}
          placeholder="Exercise title..."
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Type</label>
        <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
          <option key={-1} value="-1" hidden>Exercise type...</option>
          <option key={0} value="cardio">Cardio</option>
          <option key={1} value="olympic Weightlifting">Olympic Weightlifting</option>
          <option key={2} value="plyometrics">Plyometrics</option>
          <option key={3} value="powerlifting">Powerlifting</option>
          <option key={4} value="strength">Strength</option>
          <option key={5} value="stretching">Stretching</option>
          <option key={6} value="strongman">Strongman</option>
        </select>
      </div>
      <div className="form-group mb-2">
        <label>Muscle</label>
        <select className="form-select" value={muscle} onChange={e => setMuscle(e.target.value)}>
          <option key={-1} value="-1" hidden>Target muscle...</option>
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
      <div className="form-group mb-2">
        <label>Equipment used</label>
        <input
          type="text"
          onChange={(e) => setEquipment(e.target.value)}
          value={equipment}
          className={`form-control ${emptyFields.includes("equipment") ? "is-invalid" : ""}`}
          placeholder="Equipment used..."
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Difficulty</label>
        <select className="form-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option key={-1} value="-1" hidden>Difficulty level...</option>
          <option key={0} value="beginner">Beginner</option>
          <option key={1} value="intermediate">Intermediate</option>
          <option key={2} value="expert">Expert</option>
        </select>
      </div>
      <div className="form-group mb-2">
        <label>Load</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={`form-control ${emptyFields.includes("load") ? "is-invalid" : ""}`}
          placeholder="Load in lbs..."
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={`form-control ${emptyFields.includes("reps") ? "is-invalid" : ""}`}
          placeholder="Number of reps..."
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      
      <button className="btn btn-success mt-2">Add Workout</button>
    </form >
  );
};

export default WorkoutForm;
