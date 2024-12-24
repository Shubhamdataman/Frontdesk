import { forwardRef } from "react";
import PropTypes from "prop-types";

// Custom styles for DMAvatar
import DMAvatarRoot from "./DMAvatarRoot";

const DMAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <DMAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Setting default values for the props of DMAvatar
DMAvatar.defaultProps = {
  bgColor: 'rgba(0, 0, 0, 0)',
  size: "md",
  shadow: "none",
};

// Typechecking props for the DMAvatar
DMAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    'rgba(0, 0, 0, 0)',
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default DMAvatar;
