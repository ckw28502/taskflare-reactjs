import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { arrayOf, object } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SidebarItem({ items }) {

    const [listItem, setListItems] = useState([]);

    const updateListItem = useCallback(() => {
        setListItems(items.map((item, index) => {
            return (
                <ListItem key={index}>
                    <ListItemButton component={Link} to={item.href}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            )
        }))
    }, [items]);

    useEffect(() => updateListItem(), [items, updateListItem])

    return (
        <List>
            {listItem}
        </List>
    )
}

SidebarItem.propTypes = {
    items: arrayOf(object).isRequired
}

export default SidebarItem;