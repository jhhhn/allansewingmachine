import React, { useEffect, useState } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from 'react-redux';
import { cleanOrder, getPaypalScript } from '../redux/order/order-action';
import Loading from './loading'

const Paypal = (props) => {
    const dispatch = useDispatch()
    const [paypalConfig, setPaypalConfig] = useState({})
    const [sdkReady, setSdkReady] = useState(false)


    useEffect(() => {
        const addPaypalScript = async (clientId) => {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
          script.async = true
          script.onload = () => {
            setSdkReady(true)
          }
            document.body.appendChild(script)
        }
        dispatch(getPaypalScript())
        .then(res => {
            setPaypalConfig(res.payload)
            addPaypalScript(res.payload.sandbox)
        })
        return () => {
            dispatch(cleanOrder())
        }
    }, [dispatch])
    return (
      <>
        {
          sdkReady ?
            <PayPalButton
                amount={props.toPay}
                currency={paypalConfig.currency}
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderId: data.orderID
                        })
                    });
                }}
            />
          :  <Loading />
        }
      </>
    )
  }

  export default Paypal