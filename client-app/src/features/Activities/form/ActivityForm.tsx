import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { CategoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { ActivityFormValues } from "../../../app/models/Activity";

export default observer(function ActivityForm() {
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loadActivity, loadingInitial } =
		activityStore;

	const { id } = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState<ActivityFormValues>(
		new ActivityFormValues()
	);

	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		date: Yup.string().required("Date is required").nullable(),
		description: Yup.string().required(),
		category: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
	});

	useEffect(() => {
		if (id)
			loadActivity(id).then((activity) =>
				setActivity(new ActivityFormValues(activity))
			);
	}, [id, loadActivity]);

	function handleOnSubmit(activity: ActivityFormValues) {
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
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => handleOnSubmit(values)}
			>
				{({ handleSubmit, isSubmitting, isValid, dirty }) => (
					<Form
						className="ui form"
						onSubmit={handleSubmit}
						autoComplete="off"
					>
						<Header
							content="Activity Details"
							sub
							color="teal"
						/>
						<TextInput
							placeholder="Title"
							name="title"
						/>
						<TextArea
							rows={3}
							placeholder="Description"
							name="description"
						/>
						<SelectInput
							options={CategoryOptions}
							placeholder="Category"
							name="category"
						/>
						<DateInput
							placeholderText="Date"
							name="date"
							showTimeSelect
							timeCaption="time"
							dateFormat={"MMMM d, yyyy h:mm aa"}
						/>
						<Header
							content="Location Details"
							sub
							color="teal"
						/>
						<TextInput
							placeholder="City"
							name="city"
						/>
						<TextInput
							placeholder="Venue"
							name="venue"
						/>
						<Button
							disabled={isSubmitting || !isValid || !dirty}
							floated="right"
							type="submit"
							positive
							loading={isSubmitting}
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
				)}
			</Formik>
		</Segment>
	);
});
