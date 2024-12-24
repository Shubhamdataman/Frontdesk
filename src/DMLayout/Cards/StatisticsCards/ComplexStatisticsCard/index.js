// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Aatithya React components
import DMBox from "../../../../components/DMBox";
import DMTypography from "../../../../components/DMTypography";

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card>
      <DMBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <DMBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </DMBox>
        <DMBox textAlign="right" lineHeight={1.25}>
          <DMTypography variant="button" fontWeight="light" color="text">
            {title}
          </DMTypography>
          <DMTypography variant="h4">{count}</DMTypography>
        </DMBox>
      </DMBox>
      <Divider />
      <DMBox pb={2} px={2}>
        <DMTypography component="p" variant="button" color="text" display="flex">
          <DMTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </DMTypography>
          &nbsp;{percentage.label}
        </DMTypography>
      </DMBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
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
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
