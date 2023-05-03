import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SavedWorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const deleteWorkout = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex justify-content-between">
        <h3 className="mb-2">{formatSentence(workout.title)}</h3>
        <small className="text-muted">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</small>
      </div>
      <div className="d-flex">
        <div className="row flex-grow-1">
          <div className="col-xl-6 col-12">
            <p className="mb-1">
              <strong>Type: </strong>
              {formatSentence(workout.type)}
            </p>
            <p className="mb-1">
              <strong>Muscle: </strong>
              {formatSentence(workout.muscle)}
            </p>
            <p className="mb-1">
              <strong>Equipment: </strong>
              {formatSentence(workout.equipment)}
            </p>
          </div>
          <div className="col-xl-6 col-12">
            <p className="mb-1">
              <strong>Difficulty: </strong>
              {formatSentence(workout.difficulty)}
            </p>
            <p className="mb-1">
              <strong>Load: </strong>
              {workout.load + " lbs"}
            </p>
            <p className="mb-1">
              <strong>Reps: </strong>
              {workout.reps}
            </p>
          </div>
          <div className="col-12">
            <p className="mb-1">
              <strong>Description: </strong>
              <small className="text-muted">{formatSentence(workout.instructions)}</small>
            </p>
          </div>
        </div>
        <div className="d-flex flex-column-reverse">
          <button className="btn btn-success mb-1" style={{ cursor: "pointer" }} onClick={deleteWorkout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function formatSentence(str) {
  if (!str) {
    return
  }
  str = str.charAt(0).toUpperCase() + str.slice(1)
  str = str.replaceAll("_", " ")
  return str
}

export default SavedWorkoutDetail;
