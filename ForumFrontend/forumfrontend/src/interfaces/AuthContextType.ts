import { LoginCredentials } from "./LoginCredentials";

export type AuthContextType = {
	isAuthenticated: boolean;
	login: (creds: LoginCredentials) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
};
