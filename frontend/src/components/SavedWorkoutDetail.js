import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsTrash3Fill } from "react-icons/bs";

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
          <div className="col-lg-7 col-12">
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
          <div className="col-lg-5 col-12">
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
          <button className="btn btn-success mb-1 pb-0 pt-1 px-2" onClick={deleteWorkout}><h5><BsTrash3Fill /></h5></button>
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
