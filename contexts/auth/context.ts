import { createContext } from "react";

type AuthContextType = {
	user: null;
	refetch: () => void;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});
