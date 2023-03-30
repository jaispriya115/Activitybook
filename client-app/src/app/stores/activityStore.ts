import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";
import { Activity, ActivityFormValues } from "../models/Activity";
import { Profile } from "../models/Profiles";
import { store } from "./store";

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
			(a, b) => a.date!.getTime() - b.date!.getTime()
		);
	}

	get groupedActivities() {
		return Object.entries(
			this.activitiesByDate.reduce((activities, activity) => {
				const date = format(activity.date!, "dd MMM yyyy");
				activities[date] = activities[date]
					? [...activities[date], activity]
					: [activity];
				return activities;
			}, {} as { [key: string]: Activity[] })
		);
	}

	private getactivity = (id: string) => {
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
				runInAction(() => {
					this.selectedActivity = activity;
				});
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				this.setLoadingInitial(false);
			}
		}
	};

	private setActivity = (activity: Activity) => {
		const user = store.userStore.user;
		if (user) {
			activity.isGoing = activity.attendees!.some(
				(a) => a.username === user.username
			);
			activity.isHost = activity.hostUsername === user.username;
			activity.host = activity.attendees?.find(
				(x) => x.username === activity.hostUsername
			);
		}
		activity.date = new Date(activity.date!);
		this.activities.set(activity.id, activity);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createActivity = async (activity: ActivityFormValues) => {
		const user = store.userStore.user;
		const attendee = new Profile(user!);
		try {
			await agent.Activities.create(activity);
			const newActivity = new Activity(activity);
			newActivity.hostUsername = user!.username;
			newActivity.attendees = [attendee];
			this.setActivity(newActivity);
			runInAction(() => {
				this.selectedActivity = newActivity;
			});
		} catch (error) {
			console.log(error);
		}
	};

	updateActivity = async (activity: ActivityFormValues) => {
		try {
			await agent.Activities.update(activity);

			runInAction(() => {
				if (activity.id) {
					let updatedActivity = {
						...this.getactivity(activity.id),
						...activity,
					};
					this.activities.set(
						activity.id,
						updatedActivity as Activity
					);
					this.selectedActivity = updatedActivity as Activity;
				}
			});
		} catch (error) {
			console.log(error);
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

	updateAttendance = async () => {
		const user = store.userStore.user;
		this.loading = true;
		try {
			await agent.Activities.attend(this.selectedActivity!.id);
			runInAction(() => {
				if (this.selectedActivity?.isGoing) {
					this.selectedActivity.attendees =
						this.selectedActivity.attendees?.filter(
							(a) => a.username !== user?.username
						);
					this.selectedActivity.isGoing = false;
				} else {
					const attendee = new Profile(user!);
					this.selectedActivity?.attendees?.push(attendee);
					this.selectedActivity!.isGoing = true;
				}
				this.activities.set(
					this.selectedActivity!.id,
					this.selectedActivity!
				);
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.loading = false));
		}
	};

	cancelActivityToggle = async () => {
		this.loading = true;
		try {
			await agent.Activities.attend(this.selectedActivity!.id);
			runInAction(() => {
				this.selectedActivity!.isCancelled =
					!this.selectedActivity?.isCancelled;

				this.activities.set(
					this.selectedActivity!.id,
					this.selectedActivity!
				);
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.loading = false));
		}
	};
}
