// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import DMBox from "../../../components/DMBox";
import DMTypography from "../../../components/DMTypography";

// Timeline context
import { useTimeline } from "../context";

// Custom styles for the TimelineItem
import timelineItem from "./styles";

function TimelineItem({ color, icon, title, dateTime, description, lastItem }) {
  const isDark = useTimeline();

  return (
    <DMBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <DMBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </DMBox>
      <DMBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <DMTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </DMTypography>
        <DMBox mt={0.5}>
          <DMTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </DMTypography>
        </DMBox>
        <DMBox mt={2} mb={1.5}>
          {description ? (
            <DMTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </DMTypography>
          ) : null}
        </DMBox>
      </DMBox>
    </DMBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
