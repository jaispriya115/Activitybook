import { Key } from "react";
import { Message } from "semantic-ui-react";

interface Props {
	errors: any;
}
export default function ValidationErrors({ errors }: Props) {
	return (
		<Message error>
			{errors && (
				<Message.List>
					{errors.map((err: any, i: Key | null | undefined) => (
						<Message.Item key={i}>{err}</Message.Item>
					))}
				</Message.List>
			)}
		</Message>
	);
}
