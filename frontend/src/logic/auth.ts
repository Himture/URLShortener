import { CognitoJwtVerifier } from "aws-jwt-verify";

const userPoolId = 'ap-south-1_OckXPNIFl';
const appClientId = '3i9euoh46p7ksooio91395srai';

export function setToken(token:string) {
    localStorage.setItem('Oslash', token)
}

export function remToken(){
    localStorage.removeItem('Oslash')
}

export async function authenticate() {
    const token = localStorage.getItem('Oslash')
    if(token){
        const username = await getUsername(token)
        return username
    }
    else{
        return null
    }
}

export async function getUsername(token: string) {

    const verifier = CognitoJwtVerifier.create({
        userPoolId: userPoolId,
        tokenUse: "access",
        clientId: appClientId,
    });

    try {
        const payload = await verifier.verify(
            token
        );
        return payload.username
    } catch (error) {
        let err = "error";
        if (error instanceof Error) {
            err = error.message;
        }
        return err;
    }

}