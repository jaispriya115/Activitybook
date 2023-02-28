import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navbar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to={"/"}>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          EventBook
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to={"/events"} />
        <Menu.Item>
          <Button positive content="Create Events" as={NavLink} to={"/createEvent"} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
