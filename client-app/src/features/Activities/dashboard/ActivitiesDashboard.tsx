import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivitiesList from "./ActivitiesList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  editMode,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiesList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <div>
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={cancelSelectActivity}
              openForm={() => openForm(selectedActivity.id)}
            />
          </div>
        )}
        {editMode && (
          <ActivityForm
            createOrEdit={createOrEdit}
            activity={selectedActivity}
            closeForm={closeForm}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
