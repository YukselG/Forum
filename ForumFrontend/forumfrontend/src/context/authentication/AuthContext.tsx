import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../../api/ApiURL";
import { AuthContextType } from "../../interfaces/AuthContextType";
import { LoginCredentials } from "../../interfaces/LoginCredentials";
import { LoginUser } from "../../api/services/accountService/LoginService";
import { LogoutUser } from "../../api/services/accountService/LogoutService";
import { CheckUserAuth } from "../../api/services/accountService/CheckAuthService";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	async function checkAuth() {
		try {
			const response = await CheckUserAuth();
			if (response) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (err) {
			console.error("Error checking auth", err);
			setIsAuthenticated(false);
		}
	}

	useEffect(() => {
		checkAuth();
	}, []);

	async function login(credentials: LoginCredentials) {
		const response = await LoginUser(credentials);
		if (response) {
			setIsAuthenticated(true);
		} else {
			throw new Error("LoginUser response not succesful");
		}
	}

	async function logout() {
		const response = await LogoutUser();
		if (response) {
			setIsAuthenticated(false);
		} else {
			throw new Error("LogoutUser response not succesful");
		}
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
