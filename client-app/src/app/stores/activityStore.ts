import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore {
	activities = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get activitiesByDate() {
		return Array.from(this.activities.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);
	}

	getactivity = (id: string) => {
		return this.activities.get(id);
	};

	loadActivities = async () => {
		this.setLoadingInitial(true);
		try {
			const activities = await agent.Activities.list();
			activities.forEach((activity) => {
				this.setActivity(activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadActivity = async (id: string) => {
		let activity = this.getactivity(id);
		if (activity) {
			this.selectedActivity = activity;
			return activity;
		} else {
			this.setLoadingInitial(true);
			try {
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				this.selectedActivity = activity;
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				this.setLoadingInitial(false);
			}
		}
	};

	setActivity = (activity: Activity) => {
		activity.date = activity.date.split("T")[0];
		this.activities.set(activity.id, activity);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.create(activity);
			runInAction(() => {
				this.activities.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				this.activities.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteActivity = async (id: string) => {
		this.loading = true;
		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activities.delete(id);
				this.loading = false;
			});
		} catch (error) {
			this.loading = false;
		}
	};
}