import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {
	const { activityStore } = useStore();
	const {
		selectedActivity: activity,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams();

	useEffect(() => {
		if (id) loadActivity(id);
	}, [id, loadActivity]);

	if (loadingInitial || !activity) return <Loading />;

	return (
		<Card fluid>
			<Image
				src={`/assets/categoryImages/${activity.category}.jpg`}
				alt="category"
			/>
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						color="blue"
						content="Edit"
						as={Link}
						to={`/manage/${activity.id}`}
					/>
					<Button
						basic
						color="grey"
						content="Cancel"
						as={Link}
						to={"/events"}
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
