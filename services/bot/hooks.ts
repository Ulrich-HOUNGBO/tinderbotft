// ----------QUERY & MUTATION KEYS---------- //
import {
  addBot,
  createBotCredentials,
  getAllBotByStrategy,
  getAllBots,
  getBotById,
  removeBot,
  startBot,
  updateBot,
} from "@/services/bot/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const botQueryKeys = {
  botsKey: ["bots-list"],
  botStrategyKey: (strategy: string) => ["bots-strategy", strategy],
  botKey: (id: string) => ["bot", id],
  addBotKey: ["add-bot"],
  updateBotKey: (id: string) => ["update-bot", id],
  removeBotKey: (id: string) => ["remove-bot", id],
  startBotKey: (id: string) => ["start-bot", id],
  stopBotKey: (id: string) => ["stop-bot", id],
};

// --------------- QUERIES HOOKS --------------- //
export const useBots = () => {
  return useQuery({
    queryKey: botQueryKeys.botsKey,
    queryFn: () => getAllBots(),
  });
};

export const useBot = (id: string) => {
  return useQuery({
    queryKey: botQueryKeys.botKey(id),
    queryFn: () => getBotById(id),
  });
};

export const useBotsByStrategy = (strategy: string) => {
  return useQuery({
    queryKey: botQueryKeys.botStrategyKey(strategy),
    queryFn: () => getAllBotByStrategy(strategy),
  });
};

// --------------- MUTATIONS HOOKS --------------- //
export const useAddBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: botQueryKeys.addBotKey,
    mutationFn: (credentials: createBotCredentials) => addBot(credentials),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botsKey,
      });
    },
  });
};

export const useUpdateBot = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: createBotCredentials) =>
      updateBot(id, credentials),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botsKey,
      });
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botKey(id),
      });
    },
  });
};

export const useRemoveBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeBot(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botsKey,
      });
    },
  });
};

export const useStartBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => startBot(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botsKey,
      });
    },
  });
};

export const useStopBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => startBot(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: botQueryKeys.botsKey,
      });
    },
  });
};
