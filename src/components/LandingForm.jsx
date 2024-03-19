import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { Form, Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import PasswordComponent from "./PasswordComponent";
import * as Yup from 'yup';
import { useTheme } from "@emotion/react";


function LandingForm(props) {
    const theme = useTheme();

    let title;
    let link;
    let linkText;

    if (props.action === "LOGIN") {
      title = "SIGN IN";
      link = "/register";
      linkText = "SIGN UP";
    } else {
      title = "SIGN UP";
      link = "/login";
      linkText = "SIGN IN";

    }

    const containerColor = theme.palette.container;
    const linkColor = theme.palette.link;

    const validationSchema = Yup.object().shape(props.validationSchema);
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh'
          }}>
            <Box sx={{
              width: '50%',
              backgroundColor: containerColor,
              padding: '24px',
              maxHeight: '100vh',
              textAlign: 'center',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4
            }}>
            <Typography variant="h4" sx={{ mb: 1 }}>{ title }</Typography>
            <Formik
                initialValues={props.initialValues}
                validationSchema={validationSchema}
                onSubmit={values => props.onSubmit(values)}
            >
                <Form className="place-self-center justify-self-center flex flex-col">
                    <InputComponent type="text" name="email" label="Email Address" id="email"/>
                    <PasswordComponent name="password" label="Password" id="password"/>
                    {
                      // If register, show confirmation password
                      props.action === "REGISTER" && (
                        <PasswordComponent
                          name="confirmation-password"
                          label="Confirmation Password"
                          id="confirmation-password"
                        />
                      )
                    }
                    <Button type="submit" variant="contained" name="button" id="button">{props.action}</Button>
                </Form>
            </Formik>
            <Link to={ link } className="mt-3">
              <Typography variant="body2" sx={{
                textDecoration: "underline",
                color: linkColor.base,
                "&:hover": {
                  color: linkColor.hover
                }
              }}>
                { linkText }
              </Typography>
            </Link>
            </Box>
          </Box>
    )
}

LandingForm.propTypes = {
    validationSchema: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired
};
    
export default LandingForm;
