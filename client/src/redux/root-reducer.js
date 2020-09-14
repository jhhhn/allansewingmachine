import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import alert from "./alert/alert-reducer";
import auth from "./auth/auth-ruducer";
import cart from "./cart/cart-reducer"
import collection from "./collection/collection-reducer"
import product from "./product/product-reducer" 

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['auth','cart']
}

const rootReducer = combineReducers({
    alert,
    auth,
    collection,
    product,
    cart
})

export default persistReducer(persistConfig, rootReducer);
