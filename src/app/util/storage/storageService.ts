const TOKEN_KEY = 'TOKEN_KEY'
const ROLES_KEY = 'ROLES_KEY'
const CART_ITEMS_KEY = 'CART_ITEMS'

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

    static setRoles(roles: string[]) {
        localStorage.setItem(ROLES_KEY, JSON.stringify(roles))
    }

    static clearTokenAndRoles() {
        localStorage.setItem(TOKEN_KEY, "")
        localStorage.setItem(ROLES_KEY, '[]')
    }

    static getRoles(): any[] {
        const rolesString = localStorage.getItem(ROLES_KEY)
        if (rolesString == null || rolesString == 'undefined' || rolesString.length < 2) {
            return []
        }
        return JSON.parse(rolesString)
    }

    static userHasRole(role: string) {
        return this.getRoles().includes(role)
    }

    static addCartItem(cartItem: any) {
        const existingItems = this.getCartItems()
        existingItems.push(cartItem)
        return localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(existingItems))
    }

    static updateAllCartItems(items) {
        this.clearCardItems()
        return localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items))
    }

    static clearCardItems() {
        localStorage.setItem(CART_ITEMS_KEY, '[]')
    }

    static getCartItems(): any[] {
        const itemsString = localStorage.getItem(CART_ITEMS_KEY)
        if (itemsString == null || itemsString == 'undefined' || itemsString.length < 2) {
           return []
        }
        return JSON.parse(itemsString)
    }
}