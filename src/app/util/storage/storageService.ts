const TOKEN_KEY = 'TOKEN_KEY'
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
        let items = JSON.parse(localStorage.getItem(CART_ITEMS_KEY))
        if (items == null) {
            items = []
        }
        return items
    }
}