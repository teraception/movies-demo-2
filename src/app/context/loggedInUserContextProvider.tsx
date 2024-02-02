"use client";

import { User } from "@/app/user/domainModels/user";
import { createContext, useContext, useState } from "react";

interface LoggedInUserContextType {
    loggedInUser: User;
    updateLoggedInUser: (user: User) => void;
}

interface LoggedInUserProviderProps {
    children: React.ReactNode;
}

export const LoggedInUserContext = createContext<
    LoggedInUserContextType | undefined
>(undefined);

export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const LoggedInUserContextProvider = (
    props: LoggedInUserProviderProps
) => {
    const { children } = props;
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    const updateLoggedInUser = (user: User) => {
        setLoggedInUser(user);
    };

    return (
        <LoggedInUserContext.Provider
            value={{ updateLoggedInUser, loggedInUser }}>
            {children}
        </LoggedInUserContext.Provider>
    );
};
