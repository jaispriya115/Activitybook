import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
	const location = useLocation();

	return (
		<>
			<ToastContainer
				position="bottom-right"
				theme="colored"
				hideProgressBar
			/>
			{location.pathname === "/" ? (
				<HomePage />
			) : (
				<>
					<Navbar />
					<Container style={{ marginTop: "7em" }}>
						<Outlet />
					</Container>
				</>
			)}
		</>
	);
}

export default observer(App);
