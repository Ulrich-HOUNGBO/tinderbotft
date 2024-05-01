import {
  addPlan,
  createPlanCredentials,
  getAllPlans,
  getPlanById,
  removePlan,
  updatePlan,
} from "@/services/plans/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --------------- QUERY KEYS --------------- //
export const plansQueryKeys = {
	plansKey: ["plans-list"],
	planKey: (id: string) => ["plan", id],
	addPlanKey: ["add-plan"],
	updatePlanKey: (id: string) => ["update-plan", id],
	removePlanKey: (id: string) => ["remove-plan", id],
};

// --------------- QUERIES HOOKS --------------- //
export const usePlans = () => {
	return useQuery({
		queryKey: plansQueryKeys.plansKey,
		queryFn: () => getAllPlans(),
	});
};

export const usePlan = (id: string) => {
	return useQuery({
		queryKey: plansQueryKeys.planKey(id),
		queryFn: () => getPlanById(id),
	});
};

// --------------- MUTATIONS HOOKS --------------- //
export const useAddPlan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: plansQueryKeys.addPlanKey,
		mutationFn: (credentials: createPlanCredentials) => addPlan(credentials),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: plansQueryKeys.plansKey,
			});
		},
	});
};

export const useUpdatePlan = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials: createPlanCredentials) => updatePlan(id, credentials),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: plansQueryKeys.plansKey,
			});
			queryClient.invalidateQueries({
				queryKey: plansQueryKeys.planKey(id),
			});
		},
	});
};

export const useRemovePlan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => removePlan(id),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: plansQueryKeys.plansKey,
			});
		},
	});
};
