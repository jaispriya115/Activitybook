import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilter() {
	return (
		<>
			<Menu
				vertical
				size="large"
				style={{ width: "100%", marginTop: 16 }}
			>
				<Header
					icon="filter"
					attached
					color="teal"
					content="Filters"
				/>
				<Menu.Item content="All activities" />
				<Menu.Item content="I am going" />
				<Menu.Item content="I am hosting" />
			</Menu>
			<Header />
			<Calendar />
		</>
	);
}
