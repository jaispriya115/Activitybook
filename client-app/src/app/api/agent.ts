import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/Activity";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token && config.headers)
		config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(
	async (response) => {
		await sleep(1000);
		return response;
	},
	(error: AxiosError) => {
		const { status, data } = error.response as AxiosResponse;
		switch (status) {
			case 404:
				toast.error("not found");
				break;
			case 400:
				if (data.errors) {
					const stateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key])
							stateErrors.push(data.errors[key]);
					}
					throw stateErrors.flat();
				} else {
					toast.error(data);
				}
				break;
			case 403:
				toast.error("forbidden");
				break;
			case 401:
				toast.error("unauthorised");
				break;
			case 500:
				toast.error("server error");
				break;
			default:
				toast.error("bad request");
				break;
		}
		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) =>
		axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
	list: () => request.get<Activity[]>("/activities"),
	details: (id: string) => request.get<Activity>(`/activities/${id}`),
	create: (activity: ActivityFormValues) =>
		request.post("/activities", activity),
	update: (activity: ActivityFormValues) =>
		request.put(`/activities/${activity.id}`, activity),
	delete: (id: string) => request.del(`/activities/${id}`),
	attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
};

const Account = {
	currentUser: () => request.get<User>("/account"),
	login: (user: UserFormValues) => request.post<User>("/account/login", user),
	register: (user: UserFormValues) =>
		request.post<User>("/account/register", user),
};

export const agent = { Activities, Account };
