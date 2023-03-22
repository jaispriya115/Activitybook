import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import Login from "../users/Login";
import Register from "../users/Register";

export default observer(function HomePage() {
	const { userStore, modalStore } = useStore();

	return (
		<Segment
			inverted
			textAlign="center"
			vertical
			className="masthead"
		>
			<Container text>
				<Header
					as="h1"
					inverted
				>
					<Image
						size="massive"
						src="/assets/logo.png"
						alt="logo"
						style={{ marginBottom: 15 }}
					/>
					EventsBook
				</Header>
				{userStore.isLoggedIn ? (
					<>
						<Button
							as={Link}
							to="/events"
							size="huge"
							inverted
							content="Explore events around you"
						/>
					</>
				) : (
					<>
						<Button
							size="huge"
							content="Login"
							inverted
							onClick={() => modalStore.openModal(<Login />)}
						/>
						<Button
							size="huge"
							inverted
							content="Register"
							onClick={() => modalStore.openModal(<Register />)}
						/>
					</>
				)}
			</Container>
		</Segment>
	);
});
