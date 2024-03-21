import { FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import flags from "../assets/json/flags.json";
import Flag from "react-world-flags";

function LanguageSelectComponent() {
    const { i18n } = useTranslation();

    function handleChange(value) {
        i18n.changeLanguage(value);
        }

    const items = flags.map((flag, index) => 
    <MenuItem key={ index } value={ flag.language } sx={{
    }}>
        <Flag code={ flag.country } className="w-full h-5" />
    </MenuItem>
    )
    return(
        <FormControl sx={{
            alignSelf: "end",
            position: "absolute",
            right: "2%"
        }}>
            <Select
                id="select-language"
                value={ i18n.language }
                displayEmpty
                onChange={ event => handleChange(event.target.value) }
            >
                { items }
            </Select>
        </FormControl>
    )
}

export default LanguageSelectComponent;