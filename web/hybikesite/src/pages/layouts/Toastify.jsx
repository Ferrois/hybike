import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function Toastify() {
  return (
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={false}
        limit={2}
      />
  )
}