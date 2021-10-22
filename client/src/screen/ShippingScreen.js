import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../component/FormContainer'
import CheckoutsSteps from '../component/CheckoutsSteps'
import { saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = ({history }) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
 


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutsSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>    
                    <Form.Control 
                    type='address' 
                    placeholder='Enter Address' 
                    value={address} 
                    required
                    onChange={(e) => setAddress(e.target.value)}> 
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                    type='city' 
                    placeholder='Enter city' 
                    value={city} 
                    required
                    onChange={(e) => setCity(e.target.value)}>   
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control 
                    type='postalCode' 
                    placeholder='Enter postal code' 
                    value={postalCode} 
                    required
                    onChange={(e) => setPostalCode(e.target.value)}>   
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                    type='country' 
                    placeholder='Enter country' 
                    value={country} 
                    required
                    onChange={(e) => setCountry(e.target.value)}>   
                    </Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>
                    Continue
                </Button>
                
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
