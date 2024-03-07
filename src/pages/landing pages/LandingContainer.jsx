import PropTypes from "prop-types";


function LandingContainer(props) {
    return(
        <div className="container flex justify-center items-center w-screen h-screen place-content-center bg-slate-400">
            <div className="w-1/2 bg-slate-100 py-6 px-1 max-h-1/2 place text-center rounded-lg flex flex-col">
                {props.children}
            </div>
        </div>
    )
}

LandingContainer.propTypes = {
    children: PropTypes.node.isRequired
};
    
export default LandingContainer;
