import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAILED, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAILED, 
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILED,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAILED,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAILED,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAILED} from "../constants/orderConstants";

export const orderCreateReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false, 
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAILED:
            return{
                loading: false,
                error: action.payload,
            }
    
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false, 
                order: action.payload
            }

        case ORDER_DETAILS_FAILED:
            return{
                loading: false,
                error: action.payload,
            }
    
        default:
            return state;
    }
}

export const orderPayReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false, 
                success:true
            }

        case ORDER_PAY_FAILED:
            return{
                loading: false,
                error: action.payload,
            }

        case ORDER_PAY_RESET:
            return {}
    
        default:
            return state;
    }
}

export const orderDeliverReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return {loading: true }

        case ORDER_DELIVERED_SUCCESS:
            return {
                loading: false, 
                success: true
            }

        case ORDER_DELIVERED_FAILED:
            return{
                loading: false,
                error: action.payload,
            }

            case ORDER_PAY_RESET:
                return {}
        default:
            return state;
    }
}

export const orderListMyReducer = (state={orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {loading: true }

        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false, 
                orders: action.payload
            }

        case ORDER_LIST_MY_FAILED:
            return{
                loading: false,
                error: action.payload,
            }

        case ORDER_LIST_MY_RESET:
            return {orders: []}
        default:
            return state;
    }
}

export const orderListReducer = (state={orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false, 
                orders: action.payload
            }

        case ORDER_LIST_FAILED:
            return{
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}
