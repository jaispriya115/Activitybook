import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
	const [field, meta, helpers] = useField(props.name!);

	return (
		<Form.Field error={meta.touched && !!meta.error}>
			<DatePicker
				{...field}
				{...props}
				onChange={(value) => helpers.setValue(value)}
				selected={(field.value && new Date(field.value)) || null}
				onBlur={() => helpers.setTouched(true)}
			/>
			{meta.touched && meta.error ? (
				<Label
					basic
					color="red"
				>
					{meta.error}
				</Label>
			) : null}
		</Form.Field>
	);
}
