import PropTypes from "prop-types";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { useDMController } from "../../../Context/Context";
import DMSnackbarIconRoot from "./DMSnackbarIconRoot";
import DMBox from "../DMBox";
import DMTypography from "../DMTypography";
import { Close } from "@mui/icons-material";


function DMSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  const [controller] = useDMController();
  const { darkMode } = controller;

  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = darkMode ? "inherit" : "dark";
    dateTimeColor = darkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <DMBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }) =>
            darkMode ? palette.background.card : palette[color] || palette.white.main,
        }}
      >
        <DMBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <DMBox display="flex" alignItems="center" lineHeight={0}>
            <DMSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </DMSnackbarIconRoot>
            <DMTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </DMTypography>
          </DMBox>
          <DMBox display="flex" alignItems="center" lineHeight={0}>
            <DMTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </DMTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  (bgWhite && !darkMode) || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              <Close />
            </Icon>
          </DMBox>
        </DMBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <DMBox
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette: { white, text } }) => {
              let colorValue = bgWhite || color === "light" ? text.main : white.main;

              if (darkMode) {
                colorValue = color === "light" ? "inherit" : white.main;
              }

              return colorValue;
            },
          }}
        >
          {content}
        </DMBox>
      </DMBox>
    </Snackbar>
  );
}

// Setting default values for the props of DMSnackbar
DMSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for DMSnackbar
DMSnackbar.propTypes = {
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
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default DMSnackbar;
