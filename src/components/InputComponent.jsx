import { Box, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik"
import PropTypes from "prop-types"

export default function Input(props) {
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
          <ErrorMessage name={props.name} component="div" className="text-red-500 text-sm" />
        </Box>
    </Box>
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