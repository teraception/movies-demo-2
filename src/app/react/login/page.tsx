"use client";

import { useAuth } from "@/app/cognito";
import { validateEmail } from "@/utils/validateEmail";
import {
    Typography,
    Container,
    TextField,
    Box,
    FormControlLabel,
    Checkbox,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useStyles = makeStyles({
    customTextField: {},
});

export default function Login() {
    const classes = useStyles();
    const router = useRouter();
    const { authenticate, loading: loginLoader } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorState, setErrorState] = useState({
        email: "",
        password: "",
    });
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as "email" | "password";
        setFormData({ ...formData, [name]: event.target.value });

        setErrorState({ ...errorState, [name]: "" });
    }

    async function handleFormSubmit() {
        setIsSubmitting(true);
        try {
            const { email, password } = formData;
            const newErrorState: Partial<typeof errorState> = {};
            if (!email || !validateEmail(email)) {
                newErrorState.email = "Please enter a valid email";
            }
            if (password.length < 6) {
                newErrorState.password =
                    "Password must be at-least 6 characters long";
            }
            if (Object.keys(newErrorState).length === 0) {
                const resp = await authenticate(email, password);

                if (resp?.ok) {
                    router.push("/");
                } else {
                    setErrorState(
                        resp?.error &&
                            resp?.error?.toLocaleLowerCase().includes("email")
                            ? {
                                  ...errorState,
                                  email: resp?.error as string,
                              }
                            : {
                                  ...errorState,
                                  password: resp?.error as string,
                              }
                    );
                }
            } else {
                setErrorState({ ...errorState, ...newErrorState });
            }
        } catch (e) {
            console.error(e);
        }
        setIsSubmitting(false);
    }
    return (
        <>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "500px",
                    }}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Typography variant="h3" style={{ fontWeight: "500" }}>
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                value={formData.email}
                                onChange={handleFormChange}
                                margin="normal"
                                fullWidth
                                type="email"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                className={classes.customTextField}
                            />
                            <TextField
                                value={formData.password}
                                onChange={handleFormChange}
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                className={classes.customTextField}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                            </div>
                            <Button
                                onClick={handleFormSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: "#2BD17E",
                                    height: "60px",
                                }}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}
