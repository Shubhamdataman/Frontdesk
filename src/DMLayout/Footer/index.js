// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Aatithya React components
import DMBox from "../../components/DMBox";
import DMTypography from "../../components/DMTypography";

// Aatithya React base styles
import typography from "../../assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <DMBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <DMTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </DMTypography>
        </Link>
      </DMBox>
    ));

  return (
    <DMBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <DMBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}
        <Link href={href} target="_blank">
          <DMTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </DMTypography>
        </Link>
      </DMBox>
      <DMBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </DMBox>
    </DMBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://dataman.in/", name: "Dataman Computer System PVT. LTD." },
  links: [
    { href: "https://dataman.in/", name: "Dataman Computer System" },
    { href: "https://dataman.in/", name: "About Us" },
    { href: "https://dataman.in/", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
