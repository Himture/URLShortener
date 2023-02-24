
export function setToken(token:string) {
    localStorage.setItem('Oslash', token)
}

export function remToken(){
    localStorage.removeItem('Oslash')
}

export async function authenticate() {
    const token = localStorage.getItem('Oslash')
    if(token){
        return "Pass"
    }
    else{
        return null
    }
}