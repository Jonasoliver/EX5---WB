//string com a chave para armazena e recuperar o token
export const token_key = '@wb-Token'
//verifica se o token está armazenado no localStorage
export function isAuthenticaded(){
    const token = localStorage.getItem(token_key)
    return token !== null
}
//Armazena o token 
export function login(token: string){
    localStorage.setItem(token_key, token)
}
//Recupera o token armazenado
export function getToken(){
    return localStorage.getItem(token_key)
}
//Remove o token do localStorage
export function logout(){
    localStorage.removeItem(token_key)
}

