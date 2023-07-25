import React from "react"

const Button = ({ title, onClick, className, disabled, ...rest }) => {
  return (
    <>
      {title && (
        <button
          className={`${className} hover:bg-blue-600 btn bg-blue-500 text-white `}
          onClick={onClick}
          {...rest}
        >
          {title}
        </button>
      )}
    </>
  )
}

export default Button
