import { useTheme } from "@emotion/react";
import { Check, Close } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { func, string } from "prop-types";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import positionServices from "../../../../services/positionServices";

const RemoveUser = forwardRef(function RemoveUser(props, ref) {
    const { t } = useTranslation();

    const theme = useTheme();

    const navigate = useNavigate();

    const dangerColor = theme.palette.danger;

    async function removePosition() {
        await positionServices.removePosition(props.projectId)
        navigate("/");
    }

    return (
        <>
            <Box display="flex" justifyContent="center" marginY={2}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>{t("REMOVE_POSITION")}</Typography>
            </Box>
            <Grid ref={ref} container display="flex" justifyContent="center" marginTop={4}>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={async() => await removePosition()}>
                        <Check />
                    </Button>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={() => props.closeModal()} sx={{
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

RemoveUser.propTypes = {
    projectId: string.isRequired,
    closeModal: func.isRequired
}

export default RemoveUser;