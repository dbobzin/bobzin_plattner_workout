import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, type, muscle, equipment, difficulty, instructions, load, reps };

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
      setType("");
      setMuscle("");
      setEquipment("");
      setDifficulty("");
      setLoad("");
      setReps("");
      setInstructions("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h2>Add a new workout</h2>

      <div className="form-group mb-2">
        <label>Exercise name</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`form-control bg-secondary text-white ${emptyFields.includes("title") ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Type</label>
        <select className={`form-select bg-secondary text-white ${emptyFields.includes("type") ? "is-invalid" : ""}`} value={type} onChange={e => setType(e.target.value)}>
          <option key={-1} value="" hidden></option>
          <option key={0} value="cardio">Cardio</option>
          <option key={1} value="olympic Weightlifting">Olympic Weightlifting</option>
          <option key={2} value="plyometrics">Plyometrics</option>
          <option key={3} value="powerlifting">Powerlifting</option>
          <option key={4} value="strength">Strength</option>
          <option key={5} value="stretching">Stretching</option>
          <option key={6} value="strongman">Strongman</option>
        </select>
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Muscle</label>
        <select className={`form-select bg-secondary text-white ${emptyFields.includes("muscle") ? "is-invalid" : ""}`} value={muscle} onChange={e => setMuscle(e.target.value)}>
          <option key={-1} value="" hidden></option>
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
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Equipment used</label>
        <input
          type="text"
          onChange={(e) => setEquipment(e.target.value)}
          value={equipment}
          className={`form-control bg-secondary text-white ${emptyFields.includes("equipment") ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Difficulty</label>
        <select className={`form-select bg-secondary text-white ${emptyFields.includes("difficulty") ? "is-invalid" : ""}`} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option key={-1} value="" hidden></option>
          <option key={0} value="beginner">Beginner</option>
          <option key={1} value="intermediate">Intermediate</option>
          <option key={2} value="expert">Expert</option>
        </select>
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Load (lbs)</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={`form-control bg-secondary text-white ${emptyFields.includes("load") ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={`form-control bg-secondary text-white ${emptyFields.includes("reps") ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      <div className="form-group mb-2">
        <label>Instructions</label>
        <textarea
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
          rows={4}
          className={`form-control bg-secondary text-white ${emptyFields.includes("instructions") ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
      
      <button className="btn btn-success mt-2 mb-3">Add Workout</button>
    </form >
  );
};

export default WorkoutForm;
