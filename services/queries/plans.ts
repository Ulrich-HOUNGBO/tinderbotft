import axios from "@/lib/axios";
import { PlansInterface } from "@/types";

/**
 * Query to get all plans
 * @returns {Promise<PlansInterface[]>} - List of plans
 */
export const getAllPlans = async (): Promise<PlansInterface[]> => {
	const response = await axios.get("/plans").then((data) => data);
	return response.data;
};

/**
 * Query to get a plan by id
 * @param id - Plan id
 * @returns {Promise<PlansInterface>} - Object containing plan information
 * 		- id: string
 * 		- price: string
 * 		- credit: string
 * 		- recommended: boolean
 * 		- status: "active" | "inactive"
 */
export const getPlanById = async (id: string): Promise<PlansInterface> => {
	const response = await axios.get(`/plans/${id}`).then((data) => data);
	return response.data;
};

export interface createPlanCredentials {
	price: string;
	credit: string;
	recommended: boolean;
}

/**
 * Query to create a plan
 *  @param credentials - Plan data
 */
export const createPlan = async (credentials: createPlanCredentials) => {
	const response = await axios.post("/plans", credentials);
	return response.data;
};

/**
 * Query to update a plan
 * @param id - Plan id
 * @param credentials - Plan data
 */

export const updatePlan = async (id: string, credentials: createPlanCredentials) => {
	const response = await axios.put(`/plans/${id}`, credentials);
	return response.data;
};

/**
 * Query to delete a plan
 * @param id - Plan id
 */
export const deletePlan = async (id: string) => {
	const response = await axios.delete(`/plans/${id}`);
	return response.data;
};
