import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Icon,
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemImage,
	Segment,
	SegmentGroup,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

interface Props {
	activity: Activity;
}

export default function ActivitiesListItem({ activity }: Props) {
	const [target, setTarget] = useState("");
	const { activityStore } = useStore();
	const { deleteActivity, loading } = activityStore;

	function handleDeleteActivity(e: any, id: string) {
		setTarget(e.target.name);
		deleteActivity(id);
	}

	return (
		<SegmentGroup>
			<Segment>
				<ItemGroup>
					<Item>
						<ItemImage
							src="/assets/user.png"
							circular
							size="tiny"
						/>
						<ItemContent>
							<ItemHeader
								as={Link}
								to={`/activities/${activity.id}`}
							>
								{activity.title}
							</ItemHeader>
							<ItemDescription>Hosted by Priya</ItemDescription>
						</ItemContent>
					</Item>
				</ItemGroup>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
					<Icon name="marker" /> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>Attendes go here</Segment>
			<Segment clearing>
				<span>{activity.description}</span>
				<Button
					as={Link}
					to={`/events/${activity.id}`}
					color="teal"
					floated="right"
					content="View"
				/>
			</Segment>
		</SegmentGroup>
	);
}
