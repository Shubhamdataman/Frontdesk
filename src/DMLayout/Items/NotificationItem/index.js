import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Aatithya React components
import DMBox from "../../../DmToolkit/DMBox";
import DMTypography from "../../../DmToolkit/DMTypography";

// custom styles for the NotificationItem
import menuItem from "./styles";

const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <DMBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <DMTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </DMTypography>
      <DMTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </DMTypography>
    </DMBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default NotificationItem;
