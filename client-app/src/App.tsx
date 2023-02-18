import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon>
        <Icon name="users" circular />
        <Header.Content>EventBook</Header.Content>
      </Header>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
