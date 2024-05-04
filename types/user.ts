export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type Feedback = {
	id: string;
	message: string;
	user: string;
};
