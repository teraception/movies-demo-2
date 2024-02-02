import type { CognitoUserSession } from "amazon-cognito-identity-js";
import dayjs from "dayjs";
import { useRef, useState, useEffect, useMemo } from "react";

export function useAccessToken(
    notifyExpiry = false,
    session: CognitoUserSession
) {
    const timerRef = useRef<any>(null || null);
    const [expired, setExpired] = useState<boolean>(null);
    const token = useMemo<string>(() => {
        if (session) {
            return session.getAccessToken().getJwtToken();
        }
        return null;
    }, [session]);
    const expireTime = useMemo<number>(() => {
        if (session) {
            return session.getAccessToken().getExpiration();
        }
        return null;
    }, [session]);

    useEffect(() => {
        if (notifyExpiry) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            if (token && token !== "null") {
                setExpired(false);

                timerRef.current = setTimeout(() => {
                    setExpired(true);
                }, (expireTime - dayjs().unix()) * 1000 + 500);
            }
        }
    }, [token, notifyExpiry, expireTime]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    return {
        expired,
        setExpired,
    };
}
