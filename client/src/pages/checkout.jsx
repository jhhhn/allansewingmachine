import React from 'react'
import OrderDetail from './order-detail'
import BillingShipping from './billing-shipping'
import { useSelector } from 'react-redux'

const Checkout = () => {
  const isAuthenticated = useSelector(
    ({ userLogin }) => userLogin.isAuthenticated
  )

  return (
    <div className='checkout_wrapper'>
      <BillingShipping />
      {isAuthenticated ? <OrderDetail /> : null}
    </div>
  )
}

export default Checkout
