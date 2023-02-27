import { useEffect } from "react";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/Activities/dashboard/ActivitiesDashboard";
import Loading from "./Loading";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
	const { activityStore } = useStore();

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial) return <Loading />;

	return (
		<>
			<Navbar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard />
			</Container>
		</>
	);
}

export default observer(App);
