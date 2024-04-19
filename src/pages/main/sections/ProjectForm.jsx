import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import InputComponent from "../../../components/inputs/InputComponent";
import dayjs from "dayjs";
import DatePickerComponent from "../../../components/inputs/DatePickerComponent";
import { func, object, string } from "prop-types";

function ProjectForm(props) {

    const theme = useTheme();

    const { t } = useTranslation();

    const containerColor = theme.palette.container;
    const borderColor = theme.palette.border;

    const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t("TITLE_REQUIRED")),
        description: Yup.string().required(t("DESCRIPTION_REQUIRED")),
        deadline: Yup.date().nullable().min(tomorrow, t("DEADLINE_INVALID"))
    });

    const deadline = (props.initialValues.deadline) ? dayjs(props.initialValues.deadline) : null;
    

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
            }}>{t(props.title)}</Typography>
            <Formik
                initialValues={props.initialValues}
                validationSchema={validationSchema}
                onSubmit={async(values) => await props.onSubmit(values)}
            >
                {({ setFieldValue }) => (
                        <Form sx={{
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
                                    value={deadline} 
                                    onChange={value => setFieldValue("deadline", value, true)}
                                />
                                <Button type="submit" id="btn-submit" variant="contained" sx={{
                                    marginTop: 3,
                                    py: 1
                                }}>{t("SUBMIT")}</Button>
                            </Box>
                        </Form>
                )}
            </Formik>
        </Box>
    )
}

ProjectForm.propTypes = {
    initialValues: object.isRequired,
    onSubmit: func.isRequired,
    title: string.isRequired
}

export default ProjectForm;