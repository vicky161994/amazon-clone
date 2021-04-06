import React from 'react'
import { useSelector } from 'react-redux'
import { Checkoutsteps } from '../components/CheckoutSteps'

const PlaceOrderScreen = (props) => {
    const cart = useSelector((state => state.cart));
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const
    return (
        <div>
            <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
