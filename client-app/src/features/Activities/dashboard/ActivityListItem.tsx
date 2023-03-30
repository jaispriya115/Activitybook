import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
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
	Label,
	Segment,
	SegmentGroup,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
	activity: Activity;
}

export default observer(function ActivitiesListItem({ activity }: Props) {
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
				{activity.isCancelled && (
					<Label
						color="red"
						attached="top"
						content="Cancelled"
						style={{ textAlign: "center" }}
					/>
				)}
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
								to={`/events/${activity.id}`}
							>
								{activity.title}
							</ItemHeader>
							<ItemDescription>
								Hosted by {activity.host?.displayName}
								{activity.isHost && (
									<Item.Description>
										<Label
											basic
											color="orange"
										>
											You are hosting this event
										</Label>
									</Item.Description>
								)}
								{activity.isGoing && !activity.isHost && (
									<Item.Description>
										<Label
											basic
											color="green"
										>
											You are going to this event
										</Label>
									</Item.Description>
								)}
							</ItemDescription>
						</ItemContent>
					</Item>
				</ItemGroup>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" />{" "}
					{format(activity.date!, "dd MMM yyyy h:mm aa")}
					<Icon name="marker" /> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>
				<ActivityListItemAttendee attendees={activity.attendees!} />
			</Segment>
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
});
