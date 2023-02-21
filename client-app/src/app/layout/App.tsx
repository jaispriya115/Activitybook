import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Activity } from "../models/Activity";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/Activities/dashboard/ActivitiesDashboard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuidv4() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDelete(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <Navbar openForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
