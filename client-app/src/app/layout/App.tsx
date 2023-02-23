import { useEffect, useState } from "react";
import { Activity } from "../models/Activity";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/Activities/dashboard/ActivitiesDashboard";
import { v4 as uuidv4 } from "uuid";
import { agent } from "../api/agent";
import Loading from "./Loading";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [loader, setLoader] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setActivities(activities);
			setLoader(false);
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
		if (activity.id) {
			setSubmitting(true);
			agent.Activities.update(activity).then(() => {
				setActivities([
					...activities.filter((x) => x.id !== activity.id),
					activity,
				]);
				setEditMode(false);
				setSelectedActivity(activity);
				setSubmitting(false);
			});
		} else {
			setSubmitting(true);
			activity.id = uuidv4();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setEditMode(false);
				setSelectedActivity(activity);
				setSubmitting(false);
			});
		}
	}

	function handleDelete(id: string) {
		setSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter((x) => x.id !== id)]);
			setSelectedActivity(undefined);
			setSubmitting(false);
		});
	}

	if (loader) return <Loading />;

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
					submitting={submitting}
				/>
			</Container>
		</>
	);
}

export default App;
