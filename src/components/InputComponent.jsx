import { Box, TextField } from "@mui/material";
import { useField } from "formik"
import PropTypes from "prop-types"
import ErrorMessageComponent from "./ErrorMessageComponent";

function InputComponent(props) {
  const field = useField(props)[0];
  return (
    <Box sx={{
      pb: 3,
      my: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
        <TextField {...props} {...field}/>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "0",
          width: "100%"
        }}>
          <ErrorMessageComponent targetName={props.name} />
        </Box>
    </Box>
  )
}

InputComponent.propTypes = {
    getValue: PropTypes.func,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default InputComponent;