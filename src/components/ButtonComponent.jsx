import PropTypes from "prop-types"
export default function ButtonComponent(props) {

  function handleClick(e) {
    if (props.clickEvent) {
      props.clickEvent(e)
    }
  }

  return (
    <>
      <button {...props} onClick={e => handleClick(e)} className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none lg:w-80 sm:w-3/4 mb-1">
        <span>{props.name.toUpperCase()}</span>
      </button>
    </>
  )
}

ButtonComponent.propTypes = {
    name: PropTypes.string.isRequired,
    clickEvent: PropTypes.func,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled:PropTypes.bool
}
