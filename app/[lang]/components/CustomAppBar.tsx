"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { type getDictionary } from "../../../get-dictionary";
import DarkModeSwitcher from "./DarkModSwitcher";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useParams, useRouter } from "next/navigation";

export const CustomAppBar = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) => {
  const pages = [
    dictionary.home,
    dictionary.aboutMe,
    dictionary.skills,
    dictionary.projects,
    dictionary.contact,
  ];

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [hash, setHash] = useState("");
  const open = Boolean(anchorEl);

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
  const params = useParams();

  // useEffect(() => {
  //   setHash(window.location.hash);
  //   console.log("Hash:", window.location.hash);
  // }, [params]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  };

  const renderTabs = () => {
    return (
      <Tabs
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
        value={selectedIndex}
        onChange={handleChange}
      >
        {pages.map((page, id) => (
          <Tab key={page} value={id} label={page} />
        ))}
      </Tabs>
    );
  };

  const renderMenu = () => {
    return (
      <div>
        <List
          component="nav"
          // sx={{ bgcolor: "background.paper" }}
        >
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText primary="Menu" secondary={pages[selectedIndex]} />
          </ListItemButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {pages.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            "@media (min-width: 0px)": { paddingRight: 0, paddingLeft: 0 },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Container>{isDownSm ? renderMenu() : renderTabs()}</Container>
          </Box>
          <LocaleSwitcher />
          <DarkModeSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
