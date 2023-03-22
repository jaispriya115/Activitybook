import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivitiesDashboard from "../../features/Activities/dashboard/ActivitiesDashboard";
import ActivityDetails from "../../features/Activities/details/ActivityDetails";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import Login from "../../features/users/Login";
import App from "../layout/App";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "events",
				element: <ActivitiesDashboard />,
			},
			{
				path: "events/:id",
				element: <ActivityDetails />,
			},
			{
				path: "createEvent",
				element: <ActivityForm key="create" />,
			},
			{
				path: "manage/:id",
				element: <ActivityForm key="manage" />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
