import { Box } from "@mui/material";
import PropTypes from "prop-types";

function LandingContainer(props) {
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh'
          }}>
            <Box sx={{
              width: '50%',
              backgroundColor: '#f0f0f0',
              padding: '24px',
              maxHeight: '100vh',
              textAlign: 'center',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4
            }}>
              {props.children}
            </Box>
          </Box>
    )
}

LandingContainer.propTypes = {
    children: PropTypes.node.isRequired
};
    
export default LandingContainer;
