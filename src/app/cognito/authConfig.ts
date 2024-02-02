import config from "@/config/config";
import { Amplify } from "aws-amplify";

export function amplifyConfigure() {
    Amplify.configure({
        authenticationFlowType: "USER_PASSWORD_AUTH",
        Auth: config.cognitoAuth,
    });
}
