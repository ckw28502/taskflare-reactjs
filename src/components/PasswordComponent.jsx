import { useState } from "react"
import PropTypes from "prop-types"
import { ErrorMessage, useField } from "formik";

export default function PasswordComponent(props) {

  const [showPassword, setShowPassword] = useState(false);

  const field = useField(props)[0]


  return (
    <>
      <div className="relative mt-1 mb-5 lg:w-80 sm:w-3/4">
        <input
          type={showPassword ? "text" : "password"}
          {...field}
          {...props}
          className="peer relative h-10 w-full border-b border-slate-200 px-4 pr-12 text-sm text-slate-900 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <label
          htmlFor={props.id}
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-00 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          {props.label.toUpperCase()}
        </label>
        {showPassword ? (
          <svg
            onClick={() => setShowPassword(!showPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-2 description-2"
            role="graphics-symbol"
          >
            <title id="title-2">Check mark icon</title>
            <desc id="description-2">Icon description here</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setShowPassword(!showPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-2d description-2d"
            role="graphics-symbol"
          >
            <title id="title-2d">Check mark icon</title>
            <desc id="description-2d">Icon description here</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        )}
        <ErrorMessage name={props.name} component="div" className="text-red-500 text-sm" />        
      </div>
    </>
  )
}

PasswordComponent.propTypes = {
    getValue: PropTypes.func,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    id: PropTypes.string.isRequired
}
