import { LoginCredentials } from "./LoginCredentials";
import { User } from "./User";

export type AuthContextType = {
	isAuthenticated: boolean;
	login: (creds: LoginCredentials) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
	user: User | null;
};
