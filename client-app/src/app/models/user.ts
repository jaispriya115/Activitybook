export interface User {
	displayName: string;
	username: string;
	image?: string;
	token: string;
}

export interface UserFormValues {
	displayName?: string;
	username?: string;
	email: string;
	password: string;
}
