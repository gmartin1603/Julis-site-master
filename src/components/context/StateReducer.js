export const initialState = {
    cart: [],
    user: null,
    isAdmin: false,
    products: null,
    category: "beauty"
}



export const getCartTotal = (cart) => {
    return (
        cart?.reduce((amount, item) => item.price + amount, 0)
    )
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item]
            }

        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.category
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
                isAdmin: action.admin,
            }

        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            }

        case "REMOVE_FROM_CART":
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            let newCart = [...state.cart];
        
            if (index >= 0) {
                newCart.splice(index, 1);
        
            } else {
                console.warn(
                `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }
            return {
                ...state,
                cart: newCart
              }

        default:
            return state
    }
}

export default reducer