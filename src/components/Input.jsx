import { useState } from "react"
import PropTypes from "prop-types"

export default function Input(props) {
  const [state, setState] = useState({
  })

  const handleChange = evt => {
    const value = evt.target.value
    props.getValue(value)
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }


  return (
    <>
      <div className="relative my-6">
        <input
          id="id-l02"
          type="text"
          name="id-l02"
          placeholder="your name"
          value={state["id-l02"]}
          className="peer relative h-12 w-full border-b border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleChange}
        />
        <label
          htmlFor="id-l02"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Your name
        </label>
      </div>
    </>
  )
}

Input.propTypes = {
    getValue: PropTypes.func.isRequired
}