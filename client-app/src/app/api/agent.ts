import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/Activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

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
	create: (activity: Activity) => request.post("/activities", activity),
	update: (activity: Activity) =>
		request.put(`/activities/${activity.id}`, activity),
	delete: (id: string) => request.del(`/activities/${id}`),
};

export const agent = { Activities };
