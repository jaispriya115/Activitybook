import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import ActivitiesList from "./ActivitiesList";

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore();
	const { loadActivities, activities, loadingInitial } = activityStore;

	useEffect(() => {
		if (activities.size <= 1) loadActivities();
	}, [activities.size, loadActivities]);

	if (loadingInitial) return <Loading />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivitiesList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Events</h2>
			</Grid.Column>
		</Grid>
	);
});
