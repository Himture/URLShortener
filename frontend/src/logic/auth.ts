
export function setToken(token:string) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('Oslash', token)
    }
}

export function remToken(){
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem('Oslash')
    }
}

export async function authenticate() {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('Oslash')
    if(token){
        return "Pass"
    }
    else{
        return null
    }
    }
}