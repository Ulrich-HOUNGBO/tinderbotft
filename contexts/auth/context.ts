import { UserInterface } from "@/types";
import { createContext } from "react";

type AuthContextType = {
	user: UserInterface | null;
	refetch: () => void;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});
