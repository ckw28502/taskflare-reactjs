import { useTheme } from "@emotion/react";
import { Check, Close } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { func, string } from "prop-types";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import taskServices from "../../../../services/taskServices";
import toastify from "../../../../tools/toastify";

const DeleteTask = forwardRef(function DeleteTask(props, ref) {
    const { t } = useTranslation();

    const theme = useTheme();


    const dangerColor = theme.palette.danger;

    async function deleteTask() {
        taskServices.deleteTask(props.taskId)
            .then(() => {
                props.closeModal();
                toastify.success(t("success.TASK_DELETED"));
                props.deleteTask();
            });
    }

    return (
        <>
            <Box display="flex" justifyContent="center" marginY={2}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>{t("DELETE_TASK")}</Typography>
            </Box>
            <Grid ref={ref} container display="flex" justifyContent="center" marginTop={4}>
                <Grid item xs={6}>
                    <Button id="btn-yes" variant="contained" onClick={async() => await deleteTask()}>
                        <Check />
                    </Button>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <Button id="btn-no" variant="contained" onClick={() => props.closeModal()} sx={{
                        backgroundColor: dangerColor.main,
                        "&:hover": {
                            backgroundColor: dangerColor.hover
                        }
                    }}>
                        <Close />
                    </Button>
                </Grid>
            </Grid>
        </>
    )
});

DeleteTask.propTypes = {
    taskId: string.isRequired,
    closeModal: func.isRequired,
    deleteTask: func.isRequired
}

export default DeleteTask;