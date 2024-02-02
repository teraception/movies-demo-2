"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { enqueueSnackbar } from "notistack";
import { useAccessToken } from "@/app/react/hooks/userAccessToken";
import { amplifyConfigure } from "@/app/cognito/authConfig";
import { LoggedInUserContext } from "@/app/context/loggedInUserContextProvider";

amplifyConfigure();

interface CognitoContextType {
    isAuthenticated: boolean;
    logout: () => void;
    authenticate: (email: string, password: string) => Promise<any>;
    loading: boolean;
    changePassword: (
        prevPassword: string,
        newPassword: string
    ) => Promise<string>;
    isChangingPassword: boolean;
    solveNewPasswordRequiredChallenge: (
        enc: string,
        newPassword: string
    ) => Promise<any>;
}

export interface CognitoContextProps {
    children: React.ReactNode;
}

export const CognitoContext = createContext<CognitoContextType | undefined>(
    undefined
);

export const useAuth = () => useContext(CognitoContext);

export const CognitoContextProvider = (props: CognitoContextProps) => {
    const { children } = props;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { updateLoggedInUser } = useContext(LoggedInUserContext);
    const [session, setSession] = useState<CognitoUserSession>(null);
    const { expired, setExpired } = useAccessToken(true, session);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    useEffect(() => {
        if (expired) {
            loadSession();
        }
    }, [expired]);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {
        try {
            const currentSession = await Auth.currentSession();
            console.log(`🚀 ~ loadSession ~ currentSession:`, currentSession);
            setIsAuthenticated(true);
            setExpired(false);

            const resp = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentSession
                        .getIdToken()
                        .getJwtToken()}`,
                },
            });

            const user = await resp.json();
            updateLoggedInUser(user);
            setSession(currentSession);
        } catch (error) {
            console.warn(error);
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    const authenticate = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await Auth.signIn(email, password);

            if (user && user.challengeName === "NEW_PASSWORD_REQUIRED") {
                console.log("redirect user here, if new password is required");
                // navigate(`${routeProvider.react.resetPassword()}`, {
                //   replace: false,
                //   state: { email, password },
                // });
            } else {
                const session = await Auth.currentSession();

                setIsAuthenticated(true);
                loadSession().then(() => {
                    window.location.reload();
                });
                return await Auth.currentAuthenticatedUser();
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const session = await Auth.currentSession();
            const resp = await fetch("/api/login", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${session
                        .getIdToken()
                        .getJwtToken()}`,
                },
            });
            await Auth.signOut();
            window.location.reload();
        } catch (error) {
            enqueueSnackbar("something went wrong while logging out");
            console.log("error signing out:", error);
        }
    };

    const changePassword = async (
        prevPassword: string,
        newPassword: string
    ) => {
        try {
            setIsChangingPassword(true);
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                const resp = await Auth.changePassword(
                    user,
                    prevPassword,
                    newPassword
                );
                enqueueSnackbar("password changed successfully");
                return resp;
            }
        } catch (error) {
            enqueueSnackbar(error);
        } finally {
            setIsChangingPassword(false);
        }
    };

    const solveNewPasswordRequiredChallenge = async (
        user: any,
        newPassword: string
    ) => {
        try {
            const response = await Auth.completeNewPassword(user, newPassword);
            return response;
        } catch (error: any) {
            enqueueSnackbar(error.message);
            console.log("error while solving new password challenge", error);
        }
    };

    return (
        <CognitoContext.Provider
            value={{
                authenticate,
                logout,
                isAuthenticated,
                loading,
                changePassword,
                isChangingPassword,
                // getAuthenticatedUser,
                solveNewPasswordRequiredChallenge,
            }}>
            {children}
        </CognitoContext.Provider>
    );
};
