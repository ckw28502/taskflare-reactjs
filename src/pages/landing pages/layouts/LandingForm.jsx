import { Box, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import InputComponent from "../../../components/inputs/InputComponent";
import PasswordComponent from "../../../components/inputs/PasswordComponent";
import * as Yup from 'yup';
import { useTheme } from "@emotion/react";
import DarkModeSwitchComponent from "../../../components/DarkModeSwitchComponent";
import { useTranslation } from "react-i18next";
import LanguageSelectComponent from "../../../components/LanguageSelectComponent";
import { func, object, string } from "prop-types";

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
          marginTop: "2%"
        }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100vw',
              minHeight: '10vh'
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
                p: 4,
                position: "relative"
              }}>
              <Box sx={{
                  alignSelf: "end",
                  position: "absolute",
                  right: "2%"
              }}>
                <LanguageSelectComponent />
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{ t(title) }</Typography>
              <Formik
                  initialValues={ props.initialValues }
                  validationSchema={ validationSchema }
                  onSubmit={ values => props.onSubmit(values) }
              >
                  <Form>
                      <Box sx={{
                        justifySelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 2,
                        width: '100%'
                      }}>
                      <InputComponent type="text" name="email" label={ t("EMAIL_ADDRESS") } id="text-email"/>
                      {
                        // If register, show name
                        props.action === "REGISTER" && (
                          <InputComponent
                            type="text"
                            name="name"
                            label={ t("NAME") }
                            id="text-name"
                          />
                        )
                      }
                      <PasswordComponent name="password" label={ t("PASSWORD") } id="pass-password"/>
                      {
                        // If register, show confirmation password
                        props.action === "REGISTER" && (
                          <PasswordComponent
                            name="confirmationPassword"
                            label={ t("CONFIRMATION_PASSWORD") }
                            id="pass-confirmation-password"
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
                      </Box>
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
              <Box sx={{
                display: "flex",
                justifyContent: "center"
              }}>
                <DarkModeSwitchComponent />
              </Box>
              </Box>
          </Box>
        </Box>
    )
}

LandingForm.propTypes = {
    validationSchema: object.isRequired,
    action: string.isRequired,
    onSubmit: func.isRequired,
    initialValues: object.isRequired
};
    
export default LandingForm;
