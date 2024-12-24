// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Aatithya React components
import DMBox from "../../../components/DMBox";
import DMTypography from "../../../components/DMTypography";
import DMButton from "../../../components/DMButton";
import DMAvatar from "../../../components/DMAvatar";

function ProfilesList({ title, profiles, shadow }) {
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <DMBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <DMBox mr={2}>
        <DMAvatar src={image} alt="something here" shadow="md" />
      </DMBox>
      <DMBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <DMTypography variant="button" fontWeight="medium">
          {name}
        </DMTypography>
        <DMTypography variant="caption" color="text">
          {description}
        </DMTypography>
      </DMBox>
      <DMBox ml="auto">
        {action.type === "internal" ? (
          <DMButton component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </DMButton>
        ) : (
          <DMButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </DMButton>
        )}
      </DMBox>
    </DMBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <DMBox pt={2} px={2}>
        <DMTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </DMTypography>
      </DMBox>
      <DMBox p={2}>
        <DMBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </DMBox>
      </DMBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
