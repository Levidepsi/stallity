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
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAILED,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILED,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAILED
} from "../constants/orderConstants";
import axios from 'axios'
import asyncHandler from 'express-async-handler'

export const createOrder  = (order) => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})

export const getOrderDetails  = (id) => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`,  config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})

export const payOrder  = (orderId, paymentResult) => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                     'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult,  config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})


export const deliverOrder  = (order) => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERED_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},  config)

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_DELIVERED_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})

export const listMyOrders  = () => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.get(`/api/orders/myorders`,  config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})

export const listOrders  = () => asyncHandler(async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                    Authorization: `Bearer ${userInfo.token}`
                
            }
        }

        const {data} = await axios.get(`/api/orders`,  config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
})