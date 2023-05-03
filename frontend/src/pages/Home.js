import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// components
import SavedWorkoutDetail from "../components/SavedWorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isOpen, setOpen] = useState(false);
  const toggleForm = () => setOpen(!isOpen);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="row mt-4">
      {isOpen && <WorkoutForm />}
      <div className="col mb-4 mx-3 p-0">
        <div className="d-flex justify-content-between">
          <h2 className="mt-2 mb-2 ms-1">Your Workouts</h2>
          <div className="d-sm-none">
            {!isOpen && <button className="btn btn-success m-2 me-0" onClick={toggleForm}>Add New Workout</button>}
            {isOpen && <button className="btn btn-primary m-2 me-0" onClick={toggleForm}>Hide Form</button>}
          </div>
        </div>
        <div className="list-group">
          {workouts &&
            workouts.map((workout) => (
              <SavedWorkoutDetail key={workout._id} workout={workout} />
            ))}
        </div>
        {workouts && workouts.length < 1 && <div className="alert alert-primary">
          <div className="d-flex align-items-center">
            <h4><BsFillExclamationCircleFill className="me-3" /></h4>
            <p className="mb-0">You do not have any workouts saved to your account. Add your own workouts, or <Link to="/Browse">browse workouts here</Link></p>
          </div>
        </div>}
      </div>
      <div className="col-5 d-none d-sm-block">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
