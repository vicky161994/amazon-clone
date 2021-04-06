import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import { Checkoutsteps } from '../components/CheckoutSteps'

export function Paymentmethodscreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <Checkoutsteps step1 step2 step3></Checkoutsteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                    <div>
                        <div>
                            <input type="radio" id="paypal" value="Paypal" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            <lable htmlFor="paypal">Paypal</lable>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            <lable htmlFor="stripe">Stripe</lable>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit" >Continue</button>
                </div>
            </form>
        </div>
    )
}
