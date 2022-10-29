import axios from 'axios'
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

function Payment() {
  ///product object name price
  const [product,setProduct] = useState({
    name :'Sample Game',
    price :200,
    description : 'this is a samle game'
  })
  async function handleToken (token , addresses){
        const Response = await axios.pbst('http://localhost:4000/payment',{token,product})



        // take response
  }

  return (
    <div className='container' style={{'marginTop': '150px'}}>
      <br /><br />
      <h1 className='text-center'>
        Stripe Payment Checkout Demo
      </h1>
      <div className='form-group container'>
        <StripeCheckout
          stripeKey='pk_test_51KyAZhH2zyeyXJUVQMd1p8bBkZ1w2Ynh05LmsSiyEB3aKPQxsjGlcZEgxIeVrLlaY9ohfFYjO6C3ZztsL3dzQigZ00vAzHgHL8' 
          token={handleToken}
          amount = {product.price*100}
          name ={product.name}
          billingAddress
          shippingAddress
          />
      </div>
    </div>
  )
}

export default Payment