import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BrowseWorkoutDetail = ({ workout, savedWorkouts }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [showInputs, setShowInputs] = useState(false)
    const [saved, setSaved] = useState(false)

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        setSaved(savedWorkouts.some(sw => sw.title === workout.name))
        setLoad("")
        setReps("")
        setShowInputs(false)
    }, [savedWorkouts, user, workout.name]);

    const saveWorkout = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in");
            return;
        }

        const newWorkout = {
            title: workout.name,
            type: workout.type,
            muscle: workout.muscle,
            equipment: workout.equipment,
            difficulty: workout.difficulty,
            instructions: workout.instructions,
            load,
            reps
        };

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(newWorkout),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            if (load && reps) {
                alert("Sorry, this workout cannot be saved")
                setShowInputs(false)
            }
        }
        if (response.ok) {
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            console.log("new workout added", json);
            dispatch({ type: "CREATE_WORKOUT", payload: json });
            setShowInputs(false);
            setSaved(true);
        }
    };

    return (
        <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex justify-content-between">
                <h3 className="mb-2">{formatSentence(workout.name)}</h3>
                {saved && <small className="text-muted">Saved!</small>}
                {!showInputs && !saved && <div className="d-flex flex-column">
                    <button className="btn btn-success mb-1" style={{ cursor: "pointer" }} onClick={() => setShowInputs(true)}>
                        Save
                    </button>
                </div>}
            </div>
            <div className="d-flex">
                <div className="row flex-grow-1">
                    <div className="col-md-6 col-12">
                        <p className="mb-1">
                            <strong>Type: </strong>
                            {formatSentence(workout.type)}
                        </p>
                        <p className="mb-1">
                            <strong>Muscle: </strong>
                            {formatSentence(workout.muscle)}
                        </p>
                    </div>
                    <div className="col-md-6 col-12">
                        <p className="mb-1">
                            <strong>Equipment: </strong>
                            {formatSentence(workout.equipment)}
                        </p>
                        <p className="mb-1">
                            <strong>Difficulty: </strong>
                            {formatSentence(workout.difficulty)}
                        </p>
                    </div>
                    <div className="col-12">
                        <p className="mb-1">
                            <strong>Description: </strong>
                            <small className="text-muted">{workout.instructions}</small>
                        </p>
                    </div>
                    {showInputs && <form className="row form-group" onSubmit={saveWorkout}>
                        <div className="form-group mb-2 col-sm-6 col-12">
                            <label>Load</label>
                            <input
                                type="number"
                                onChange={(e) => setLoad(e.target.value)}
                                value={load}
                                className={`form-control bg-secondary text-white ${emptyFields.includes("load") ? "is-invalid" : ""}`}
                                placeholder="Load in lbs..."
                            />
                            <div className="invalid-feedback">{error}</div>
                        </div>
                        <div className="form-group mb-2 col-sm-6 col-12">
                            <label>Reps</label>
                            <input
                                type="number"
                                onChange={(e) => setReps(e.target.value)}
                                value={reps}
                                className={`form-control bg-secondary text-white ${emptyFields.includes("reps") ? "is-invalid" : ""}`}
                                placeholder="Number of reps..."
                            />
                            <div className="invalid-feedback">{error}</div>
                        </div>
                        <div className="d-flex">
                            <input type="submit" className="btn btn-success m-2 ms-0"></input>
                            <button className="btn btn-primary m-2" onClick={() => setShowInputs(false)}>Cancel</button>
                        </div>
                    </form >}
                </div>
            </div>
        </div>
    );
};

function formatSentence(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1)
    str = str.replaceAll("_", " ")
    return str
}

export default BrowseWorkoutDetail;
