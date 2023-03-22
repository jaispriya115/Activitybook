import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function Navbar() {
	const {
		userStore: { user, logout },
	} = useStore();

	return (
		<Menu
			inverted
			fixed="top"
		>
			<Container>
				<Menu.Item
					header
					as={NavLink}
					to={"/"}
				>
					<img
						src="/assets/logo.png"
						alt="logo"
						style={{ marginRight: 10 }}
					/>
					EventBook
				</Menu.Item>
				<Menu.Item
					name="Events"
					as={NavLink}
					to={"/events"}
				/>
				<Menu.Item>
					<Button
						positive
						content="Create Events"
						as={NavLink}
						to={"/createEvent"}
					/>
				</Menu.Item>
				<Menu.Item position="right">
					<Image
						src={user?.image || "/assets/user.png"}
						avatar
						spaced="right"
					/>
					<Dropdown
						pointing="top left"
						text={user?.displayName}
					>
						<Dropdown.Menu>
							<Dropdown.Item
								as={Link}
								to={`/profile/${user?.username}`}
								content="My Profile"
								icon="user"
							/>
							<Dropdown.Item
								as={Link}
								to="/"
								content="Logout"
								icon="power"
								onClick={logout}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Container>
		</Menu>
	);
});
