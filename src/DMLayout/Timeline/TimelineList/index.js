// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Aatithya React components
import DMTypography from "../../../components/DMTypography";
import DMBox from "../../../components/DMBox";

// Aatithya React components
import { useDMController } from "../../../../Context/Context";

// Timeline context
import { TimelineProvider } from "../context";

function TimelineList({ title, dark, children }) {
  const [controller] = useDMController();
  const { darkMode } = controller;

  return (
    <TimelineProvider value={dark}>
      <Card>
        <DMBox
          bgColor={dark ? "dark" : "white"}
          variant="gradient"
          borderRadius="xl"
          sx={{ background: ({ palette: { background } }) => darkMode && background.card }}
        >
          <DMBox pt={3} px={3}>
            <DMTypography variant="h6" fontWeight="medium" color={dark ? "white" : "dark"}>
              {title}
            </DMTypography>
          </DMBox>
          <DMBox p={2}>{children}</DMBox>
        </DMBox>
      </Card>
    </TimelineProvider>
  );
}

// Setting default values for the props of TimelineList
TimelineList.defaultProps = {
  dark: false,
};

// Typechecking props for the TimelineList
TimelineList.propTypes = {
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default TimelineList;
