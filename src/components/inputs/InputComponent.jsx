import { Box, TextField } from "@mui/material";
import { useField } from "formik"
import ErrorMessageComponent from "../ErrorMessageComponent";
import { bool, func, string } from "prop-types";

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
    getValue: func,
    type: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    value: string,
    id: string.isRequired,
    multiline: bool
}

export default InputComponent;