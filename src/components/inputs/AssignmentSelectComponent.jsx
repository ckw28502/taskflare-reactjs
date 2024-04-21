import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import positionServices from "../../services/positionServices";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { func, string } from "prop-types";
import { useTranslation } from "react-i18next";
import { useField } from "formik";

function AssignmentSelectComponent(props) {
    const { t } = useTranslation();

    const [positions, setPositions] = useState([]);

    const [value, setValue] = useState("");

    
    const projectId = useSelector(state => state.project.id);

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
        positionServices.getAllPosition(projectId)
            .then(data => {
                setPositions(data)
            });
    }, [projectId, props.value]);

    const [selectItems, setSelectItems] = useState([]);

    useEffect(() => {
        const items = positions.map((position, index) => (
            <MenuItem key={index} value={position.id}>
                {position.email.toUpperCase()}
            </MenuItem>
        ));
        setSelectItems(items);
        
    }, [positions]);

    const field = useField(props)[0];

    function handleChange(newValue) {
        setValue(newValue);
        props.onChange(newValue);
    }


    return(
        <FormControl>
            <InputLabel id={`label-${props.id}`}>{t("USER")}</InputLabel>
            <Select
                labelId={`label-${props.id}`}
                {...props}
                {...field}
                value={value}
                onChange={event => handleChange(event.target.value)}
            >
                {selectItems}
            </Select>
        </FormControl>
    )
}

AssignmentSelectComponent.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    value: string,
    id: string.isRequired,
    onChange: func.isRequired
}

export default AssignmentSelectComponent;