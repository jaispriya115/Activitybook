import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
	userStore: UserStore;
	activityStore: ActivityStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
}

export const store: Store = {
	userStore: new UserStore(),
	activityStore: new ActivityStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
