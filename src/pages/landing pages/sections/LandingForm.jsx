import { Box, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputComponent from "../../../components/InputComponent";
import PasswordComponent from "../../../components/PasswordComponent";
import * as Yup from 'yup';
import { useTheme } from "@emotion/react";
import DarkModeSwitchComponent from "../../../components/DarkModeSwitchComponent";
import { useTranslation } from "react-i18next";
import LanguageSelectComponent from "../../../components/LanguageSelectComponent";

function LandingForm(props) {
    const theme = useTheme();

    const { t } = useTranslation();

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
              backgroundColor: containerColor,
              padding: '10px',
              minWidth: "30%",
              maxHeight: '100vh',
              textAlign: 'center',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              position: "relative"
            }}>
            <LanguageSelectComponent/>
            <Typography variant="h4" sx={{ mb: 1 }}>{ t(title) }</Typography>
            <Formik
                initialValues={ props.initialValues }
                validationSchema={ validationSchema }
                onSubmit={ values => props.onSubmit(values) }
            >
                <Form className="place-self-center justify-self-center flex flex-col mt-10 w-full">
                    <InputComponent type="text" name="email" label={ t("Email Address") } id="text-email"/>
                    <PasswordComponent name="password" label={ t("Password") } id="text-password"/>
                    {
                      // If register, show confirmation password
                      props.action === "REGISTER" && (
                        <PasswordComponent
                          name="confirmationPassword"
                          label={ t("Confirmation Password") }
                          id="text-confirmation-password"
                        />
                      )
                    }
                    <Button type="submit" variant="contained" name="button" id="button-submit"sx={{
                        marginY: 2,
                        paddingY: "3%",
                        fontSize: "16px"
                      }}>
                        { t(title) }
                      </Button>
                </Form>
            </Formik>
            <Link to={ link } className="my-3">
              <Typography variant="body2" sx={{
                textDecoration: "underline",
                color: linkColor.base,
                "&:hover": {
                  color: linkColor.hover
                }
              }}>
                { t(linkText) }
              </Typography>
            </Link>
            <DarkModeSwitchComponent />
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
