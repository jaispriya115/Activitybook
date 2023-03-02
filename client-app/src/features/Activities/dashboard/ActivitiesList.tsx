import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivitiesListItem from "./ActivityListItem";

export default observer(function ActivitiesList() {
	const { activityStore } = useStore();
	const { groupedActivities } = activityStore;

	return (
		<>
			{groupedActivities.map(([group, activities]) => (
				<Fragment key={group}>
					<Header
						sub
						color="teal"
					>
						{group}
					</Header>
					<Item>
						{activities.map((activity) => (
							<ActivitiesListItem
								key={activity.id}
								activity={activity}
							/>
						))}
					</Item>
				</Fragment>
			))}
		</>
	);
});
