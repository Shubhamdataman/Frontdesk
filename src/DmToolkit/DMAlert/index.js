import { useState } from "react";
import PropTypes from "prop-types";
import Fade from "@mui/material/Fade";
import DMBox from "../DMBox";
import DMAlertRoot from "./DMAlertRoot";
import DMAlertCloseIcon from "./DMAlertCloseIcon";

function DMAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <DMAlertRoot ownerState={{ color }} {...rest}>
        <DMBox display="flex" alignItems="center" color="white">
          {children}
        </DMBox>
        {dismissible ? (
          <DMAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</DMAlertCloseIcon>
        ) : null}
      </DMAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of DMAlert
DMAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the DMAlert
DMAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default DMAlert;
