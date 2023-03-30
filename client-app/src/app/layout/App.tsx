import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStore } from "../stores/store";
import Loading from "./Loading";
import ModalContainer from "../common/modalContainer/ModalContainer";

function App() {
	const location = useLocation();
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded) {
		return <Loading content="Loading app .... " />;
	}

	console.log(userStore.user);

	return (
		<>
			<ModalContainer />
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
