import { Form, Formik } from "formik";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import InputComponent from "../../../../components/inputs/InputComponent";
import { Box, Button } from "@mui/material";
import { func, string } from "prop-types";
import positionServices from "../../../../services/positionServices";
import toastify from "../../../../tools/toastify";
import getError from "../../../../tools/error";

const Invite = forwardRef(function Invite(props, ref) {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({ email: Yup.string().email(t("EMAIL_INVALID")).required(t("EMAIL_REQUIRED")) });

    async function handleSubmit(values) {
        values.projectId = props.projectId;

        positionServices.addPosition(values)
            .then(() => {
                props.closeModal();
                toastify.success(t("success.USER_ASSIGNED"));
            })
            .catch(res => {
                const message = getError(res.response.data.message);
                toastify.error(message);
            });
    }
    return(
        <Formik
            initialValues={{email: ""}}
            validationSchema={ validationSchema }
            onSubmit={async(values) => await handleSubmit(values)}
        >
            <Form ref={ref}>
                <InputComponent type="text" name="email" label={ t("EMAIL_ADDRESS") } id="text-email"/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Button type="submit" variant="contained" name="button" id="button-submit" sx={{
                        marginY: 2,
                        paddingY: "3%",
                        fontSize: "16px",
                        width: "80%"
                    }}>
                        { t("SUBMIT") }
                    </Button>
                </Box>
            </Form>
        </Formik>
    )
});

Invite.propTypes = {
    projectId: string.isRequired,
    closeModal: func.isRequired
}

export default Invite;