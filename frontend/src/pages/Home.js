import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

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
      <div className="col-12 d-sm-none">
        <div className="text-center">
          {!isOpen && <button className="btn btn-primary mb-3" onClick={toggleForm}>Add a new workout</button>}
        </div>
        {isOpen && <WorkoutForm />}
        <div className="text-end">
          {isOpen && <button className="btn btn-primary" onClick={toggleForm}>Hide form</button>}
        </div>
      </div>
      <div className="col list-group mb-4 ms-3">
        <h2>Your Workouts</h2>
        {workouts &&
          workouts.map((workout) => (
            <SavedWorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="col-5 d-none d-sm-block">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
