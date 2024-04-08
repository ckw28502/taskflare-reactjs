import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { func } from "prop-types";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import InputComponent from "../../../components/inputs/InputComponent";
import { forwardRef } from "react";
import dayjs from "dayjs";
import DatePickerComponent from "../../../components/inputs/DatePickerComponent";

const AddProject = forwardRef(function AddProject(props, ref) {
    const theme = useTheme();

    const { t } = useTranslation();

    const containerColor = theme.palette.container;
    const borderColor = theme.palette.border;

    const initialValues = {
        title: "",
        description: "",
        deadline: null
    };

    const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t("TITLE_REQUIRED")),
        description: Yup.string().required(t("DESCRIPTION_REQUIRED")),
        deadline: Yup.date().nullable().min(tomorrow, t("DEADLINE_INVALID"))
    });
    return (
        <Box sx={{
            backgroundColor: containerColor,
            border: `2px solid ${borderColor}`,
            boxShadow: 24,
            p: 4,
            width: 400
        }}>
            <Typography variant="h4" sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 4
            }}>{t("CREATE_PROJECT")}</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => props.onSubmit(values)}
            >
                {({ setFieldValue }) => (
                        <Form ref={ref} sx={{
                            placeSelf: 'center',
                            justifySelf: 'center',
                            display: 'flex',
                            justifyContent: "center",
                            marginTop: 10,
                            width: '100%'
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column"
                            }}>
                                <InputComponent type="text" name="title" label={t("TITLE")} id="text-title" />
                                <InputComponent type="text" name="description" label={t("DESCRIPTION")} id="text-description" multiline />
                                <DatePickerComponent 
                                    label={t("DEADLINE")} 
                                    name="deadline" 
                                    id="date-deadline"
                                    value={null} 
                                    onChange={value => setFieldValue("deadline", value, true)}
                                />
                                <Button type="submit" variant="contained" sx={{
                                    marginTop: 3,
                                    py: 1
                                }}>{t("SUBMIT")}</Button>
                            </Box>
                        </Form>
                )}
            </Formik>
        </Box>
    )
})

AddProject.propTypes = {
    onSubmit: func.isRequired
}

export default AddProject;