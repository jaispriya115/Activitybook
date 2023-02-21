import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function Navbar({ openForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          EventBook
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button positive content="Create Events" onClick={openForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
