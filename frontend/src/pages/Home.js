import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
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
      <div className="col-12 d-sm-none mb-4">
        <div className="text-center">
          {!isOpen && <button className="btn btn-primary" onClick={toggleForm}>Add a new workout</button>}
        </div>
        {isOpen && <WorkoutForm />}
        <div className="text-end">
          {isOpen && <button className="btn btn-primary" onClick={toggleForm}>Hide form</button>}
        </div>
      </div>
      <div className="col list-group">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="col-5 d-none d-sm-block">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
