import { act } from "@testing-library/react";
import { Profile } from "./Profiles";

export interface Activity {
	id: string;
	title: string;
	date: Date | null;
	description: string;
	category: string;
	venue: string;
	city: string;
	hostUsername: string;
	isCancelled: boolean;
	isHost: boolean;
	isGoing: boolean;
	host?: Profile;
	attendees: Profile[];
}

export class Activity implements Activity {
	constructor(init?: ActivityFormValues) {
		Object.assign(this, init);
	}
}

export class ActivityFormValues {
	id?: string = undefined;
	title: string = "";
	date: Date | null = null;
	description: string = "";
	category: string = "";
	venue: string = "";
	city: string = "";

	constructor(activity?: ActivityFormValues) {
		if (activity) {
			this.id = activity.id;
			this.title = activity.title;
			this.category = activity.category;
			this.city = activity.city;
			this.description = activity.description;
			this.date = activity.date;
			this.venue = activity.venue;
		}
	}
}
