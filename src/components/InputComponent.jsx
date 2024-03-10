import { ErrorMessage, useField } from "formik"
import PropTypes from "prop-types"

export default function Input(props) {
  const field = useField(props)[0];

  return (
    <>
      <div className="relative mt-1 mb-5 lg:w-80 sm:w-3/4">
        <input
          {...props}
          {...field}
          className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-900 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <label
          htmlFor={props.id}
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-800 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          {props.label.toUpperCase()}
        </label>
        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
      </div>
    </>
  )
}

Input.propTypes = {
    getValue: PropTypes.func,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    id: PropTypes.string.isRequired 
}