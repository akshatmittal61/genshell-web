import { FeedbackModel } from "@/models";
import { Feedback } from "@/types/user";
import { getObjectFromMongoResponse } from "@/utils/parser";

export const findOne = async (
	query: Partial<Feedback>
): Promise<Feedback | null> => {
	const res = await FeedbackModel.findOne(query);
	return getObjectFromMongoResponse<Feedback>(res);
};

export const findById = async (id: string): Promise<Feedback | null> => {
	const res = await FeedbackModel.findById(id).catch((error: any) => {
		if (error.kind === "ObjectId") return null;
		return Promise.reject(error);
	});
	return getObjectFromMongoResponse<Feedback>(res);
};

export const find = async (
	query: Partial<Feedback>
): Promise<Feedback | Feedback[] | null> => {
	const res = await FeedbackModel.find(query);
	if (res.length > 1) {
		const parsedRes = res
			.map((user) => getObjectFromMongoResponse<Feedback>(user))
			.filter((user) => user !== null) as Feedback[];
		if (parsedRes.length > 0) return parsedRes;
	} else if (res.length === 1) {
		return getObjectFromMongoResponse<Feedback>(res[0]);
	}
	return null;
};

export const create = async (
	user: Omit<Feedback, "id" | "createdAt" | "updatedAt">
): Promise<Feedback> => {
	const res = await FeedbackModel.create(user);
	return getObjectFromMongoResponse<Feedback>(res) as Feedback;
};

export const update = async (
	query: Partial<Feedback>,
	update: Partial<Omit<Feedback, "id" | "createdAt" | "updatedAt">>
): Promise<Feedback | null> => {
	const res = query.id
		? await FeedbackModel.findByIdAndUpdate(query.id, update, { new: true })
		: await FeedbackModel.findOneAndUpdate(query, update, { new: true });
	return getObjectFromMongoResponse<Feedback>(res);
};

export const remove = async (
	query: Partial<Feedback>
): Promise<Feedback | null> => {
	const res = query.id
		? await FeedbackModel.findByIdAndDelete(query.id)
		: await FeedbackModel.findOneAndDelete(query);
	return getObjectFromMongoResponse<Feedback>(res);
};
