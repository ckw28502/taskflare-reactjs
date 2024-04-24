import { useState } from "react"
import {  useField } from "formik";
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { string } from "prop-types";

export default function PasswordComponent(props) {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const field = useField(props)[0]


  return (
    <Box sx={{
      pb: 3,
      my: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
          <OutlinedInput
            {...props}
            {...field}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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

PasswordComponent.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    value: string,
    id: string.isRequired
}
