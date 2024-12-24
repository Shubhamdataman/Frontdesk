import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Aatithya React components
import DMBox from "../../DmToolkit/DMBox";
import DMTypography from "../../DmToolkit/DMTypography";

// Aatithya React example components
import SidenavCollapse from "./SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

// Aatithya React context
import {
  useDMController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "../../Context/Context";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "./styles/sidenavCollapse";

import ListItemIcon from "@mui/material/ListItemIcon";
import SidenavListCollapse from "./SidenavListCollapse";

function Sidenav({
  color,
  brand,
  brandName,
  routes,
  transactionRoutes,
  ...rest
}) {
  const [controller, dispatch] = useDMController();
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
  } = controller;

  
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () =>
    miniSidenav === false
      ? setMiniSidenav(dispatch, true)
      : setMiniSidenav(dispatch, false);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderTransactionRoutes = transactionRoutes.map(
    ({ type, name, icon, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  const renderReportsRoutes = [];

  const renderMasterRoutes = [];

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, children }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          // <Accordion sx={{color:{sidenavColor}}}>
          //   <AccordionSummary
          //     expandIcon={<ExpandMoreIcon />}
          //     id="panel1-header"
          //     key={key}
          //     color={sidenavColor}
          //     sx={{
          //       textTransform: "uppercase",
          //       key: { key },
          //       color: { textColor },
          //       fontSize: "0.900rem",
          //       pl: 3,
          //       pt: 0,
          //       pb: 0,
          //       m: 0,
          //       minHeight: 0,
          //       "&.Mui-expanded": {
          //         minHeight: 0,
          //       },
          //       "& .MuiAccordionSummary-content": {
          //         margin: 1,
          //       },
          //     }}
          //   >
          //     {title}
          //   </AccordionSummary>
          //   {/* Render transactionRoutes specific to this title */}
          //   {key === "masters" ? (
          //     <AccordionDetails sx={{ p: 0, m: 0 }}>
          //       {renderMasterRoutes}
          //     </AccordionDetails>
          //   ) : key === "transactions" ? (
          //     <AccordionDetails sx={{ p: 0, m: 0 }}>
          //       {renderTransactionRoutes}
          //     </AccordionDetails>
          //   ) : (
          //     <AccordionDetails sx={{ p: 0, m: 0 }}>
          //       {renderReportsRoutes}
          //     </AccordionDetails>
          //   )}
          // </Accordion>
          // <List sx={{ color: sidenavColor }}>
          //   <ListItemButton
          //     onClick={handleClick}
          //     sx={{
          //       textTransform: "uppercase",
          //       key: { key },
          //       color: { textColor },
          //       fontSize: "0.900rem",
          //       pl: 3,
          //       pt: 0,
          //       pb: 0,
          //       m: 0,
          //       minHeight: 0,
          //       "&.Mui-expanded": {
          //         minHeight: 0,
          //       },
          //       "& .MuiAccordionSummary-content": {
          //         margin: 1,
          //       },
          //     }}
          //   >
          //     <ListItemText primary={title} key={title} />
          //     {open ? <ExpandLess /> : <ExpandMoreIcon />}
          //   </ListItemButton>
          //   <Collapse in={open} timeout="auto" unmountOnExit>
          //     <List component="div" disablePadding>
          //       {key === "masters" ? (
          //         <ListItemText sx={{ pl: 0 }}>
          //           {renderMasterRoutes}
          //         </ListItemText>
          //       ) : key === "transactions" ? (
          //         <ListItemText sx={{ pl: 0 }}>
          //           {renderTransactionRoutes}
          //         </ListItemText>
          //       ) : (
          //         <ListItemText sx={{ pl: 0 }}>
          //           {renderReportsRoutes}
          //         </ListItemText>
          //       )}
          //     </List>
          //   </Collapse>
          // </List>
          <SidenavListCollapse
            name={title}
            icon={icon}
            active={key === collapseName}
            title={title}
            key={key}
            collapseName={collapseName}
          />
          // <SidenavCollapse
          //   name={title}
          //   icon={icon}
          //   active={key === collapseName}
          //   title={title}
          //   key={key}
          //   collapseName={collapseName}
          // />
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <DMBox pt={3} pb={1} px={4} textAlign="center">
        <DMBox
          display={{ xs: "block" }}
          // display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <DMTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>
              {" "}
              <MenuOpenIcon />
            </Icon>
          </DMTypography>
        </DMBox>
        <DMBox
          component={NavLink}
          to="/dashboard"
          display="flex"
          alignItems="center"
        >
          {brand && (
            <DMBox component="img" src={brand} alt="Brand" width="1rem" />
          )}
          <DMBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <DMTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </DMTypography>
          </DMBox>
        </DMBox>
      </DMBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
