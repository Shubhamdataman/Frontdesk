// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import DMBox from "../../../../components/DMBox";
import DMTypography from "../../../../components/DMTypography";
import DMButton from "../../../../components/DMButton";

function SimpleBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <DMBox position="relative" borderRadius="lg" mt={-3} mx={2}>
        <DMBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="relative"
          zIndex={1}
        />
        <DMBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </DMBox>
      <DMBox p={3}>
        <DMTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
          {title}
        </DMTypography>
        <DMBox mt={2} mb={3}>
          <DMTypography variant="body2" component="p" color="text">
            {description}
          </DMTypography>
        </DMBox>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <DMButton color={action.color ? action.color : "dark"}>{action.label}</DMButton>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <DMButton color={action.color ? action.color : "dark"}>{action.label}</DMButton>
          </Link>
        )}
      </DMBox>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
