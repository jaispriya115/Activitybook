import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
}

export default function ActivitiesList({
	activities,
	selectActivity,
	deleteActivity,
	submitting,
}: Props) {
	const [target, setTarget] = useState("");

	function handleDeleteActivity(e: any, id: string) {
		setTarget(e.target.name);
		deleteActivity(id);
	}

	return (
		<Segment>
			<Item.Group divided>
				{activities.map((activity) => (
					<Item key={activity.id}>
						<Item.Content key={activity.id}>
							<Item.Header as="a">{activity.title}</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city}, {activity.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Label
									basic
									content={activity.category}
								/>
								<Button
									name={activity.id}
									floated="right"
									loading={
										submitting && target === activity.id
									}
									content="Delete"
									color="red"
									onClick={(e) =>
										handleDeleteActivity(e, activity.id)
									}
								/>
								<Button
									onClick={() => selectActivity(activity.id)}
									floated="right"
									content="View"
									color="blue"
								/>
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}
