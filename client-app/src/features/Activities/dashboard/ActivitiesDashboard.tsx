import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import ActivitiesList from "./ActivitiesList";
import ActivityFilter from "./ActivityFilters";
import { PagingParams } from "../../../app/models/Pagination";
import InfiniteScroll from "react-infinite-scroller";

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore();
	const {
		loadActivities,
		activities,
		loadingInitial,
		setPagingParams,
		pagination,
	} = activityStore;
	const [loadingNext, setLoadingNext] = useState(false);

	useEffect(() => {
		if (activities.size <= 1) loadActivities();
	}, [activities.size, loadActivities]);

	function handleGetNext() {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadActivities().then(() => setLoadingNext(false));
	}

	if (loadingInitial && !loadingNext)
		return <Loading content="Loading events ..." />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<InfiniteScroll
					initialLoad={false}
					hasMore={
						!loadingNext &&
						!!pagination &&
						pagination.currentPage < pagination.totalPages
					}
					loadMore={handleGetNext}
					pageStart={0}
				>
					<ActivitiesList />
				</InfiniteScroll>
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityFilter />
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column>
		</Grid>
	);
});
