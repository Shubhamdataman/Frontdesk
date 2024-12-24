// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Aatithya React components
import DMBox from "../../../../components/DMBox";
import DMTypography from "../../../../components/DMTypography";

function DefaultInfoCard({ color, icon, title, description, value }) {
  return (
    <Card>
      <DMBox p={2} mx={3} display="flex" justifyContent="center">
        <DMBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </DMBox>
      </DMBox>
      <DMBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <DMTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </DMTypography>
        {description && (
          <DMTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </DMTypography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <DMTypography variant="h5" fontWeight="medium">
            {value}
          </DMTypography>
        )}
      </DMBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DefaultInfoCard;
