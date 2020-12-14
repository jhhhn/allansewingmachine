import React, { useState, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

const Modal = forwardRef((props, ref) => {
  const [display, setdisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    }
  })

  const open = () => {
    setdisplay(true)
  }

  const close = () => {
    setdisplay(false)
  }

  if (display) {
    return ReactDOM.createPortal(
      <div className='modal-wrapper'>
        <div onClick={close} className='modal-backdrop' />
        <div className='modal-box'>{props.children}</div>
      </div>,
      document.getElementById('modal-root')
    )
  }

  return null
})

export default Modal
