import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
	const { activityStore } = useStore();
	const {
		createActivity,
		updateActivity,
		loading,
		loadActivity,
		loadingInitial,
	} = activityStore;

	const { id } = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState({
		id: "",
		title: "",
		description: "",
		category: "",
		date: "",
		city: "",
		venue: "",
	});

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!));
	}, [id, loadActivity]);

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	function handleOnSubmit() {
		if (!activity.id) {
			activity.id = uuid();
			createActivity(activity).then(() =>
				navigate(`/events/${activity.id}`)
			);
		} else {
			updateActivity(activity).then(() =>
				navigate(`/events/${activity.id}`)
			);
		}
	}

	if (loadingInitial) return <Loading content="Loading activity..." />;

	return (
		<Segment clearing>
			<Form
				onSubmit={handleOnSubmit}
				autoComplete="off"
			>
				<Form.Input
					placeholder="Title"
					value={activity.title}
					name="title"
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder="Description"
					value={activity.description}
					name="description"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Category"
					value={activity.category}
					name="category"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Date"
					value={activity.date}
					type="date"
					name="date"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="City"
					value={activity.city}
					name="city"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Venue"
					value={activity.venue}
					name="venue"
					onChange={handleInputChange}
				/>
				<Button
					floated="right"
					type="submit"
					positive
					loading={loading}
					content="Submit"
				/>
				<Button
					floated="right"
					color="grey"
					content="Cancel"
					as={Link}
					to={activity.id ? `/events/${id}` : "/events"}
				/>
			</Form>
		</Segment>
	);
});
