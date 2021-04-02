const ACCESS_TOKEN = "access_token";

//função para gravar o TOKEN em sessão
export const writeToken = (token) => {
    window.localStorage.setItem(ACCESS_TOKEN, token);
}

//função para remover o TOKEN gravado em sessão
export const removeToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN);
}

//função para ler o valor do TOKEN gravado em sessão
export const getToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN);
}

//função para redirecionar o usuario para a página /admin
export const redirectToAdminPage = () => {
    window.location.href = "/admin";
}

//função para redirecionar o usuario para a página de login (inicial)
export const redirectToLoginPage = () => {
    window.location.href = "/";
}

