import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField } from "formik";
import { func, instanceOf, string } from "prop-types";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { Box } from "@mui/material";
import dayjs from "dayjs";

function DatePickerComponent(props) {
    const field = useField(props)[0];
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker  
                    disablePast 
                    {...field}
                    {...props}
                    sx={{
                        width: "100%"
                    }}
                /> 
            </LocalizationProvider>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                bottom: "0",
                marginTop: 1,
                width: "100%"
                }}
            >
                <ErrorMessageComponent targetName={props.name} />
            </Box>
        </>
    )
}

DatePickerComponent.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    value: instanceOf(dayjs),
    id: string.isRequired,
    onChange: func.isRequired
}

export default DatePickerComponent;