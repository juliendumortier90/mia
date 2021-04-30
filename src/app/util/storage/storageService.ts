const TOKEN_KEY = 'TOKEN_KEY'

export class StorageService {

    static isLoggedIn(): boolean {
        const token = this.getToken()
        return token != null && token != undefined && token.length > 1
    }

    static getToken(): string {
        return localStorage.getItem(TOKEN_KEY)
    }

    static setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token)
    }
}