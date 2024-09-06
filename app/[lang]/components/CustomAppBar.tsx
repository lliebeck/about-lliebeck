"use client";

import { useHash } from "@/hooks/useHash";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { type getDictionary } from "../../../get-dictionary";
import { scrollToSection } from "../../../utils/utils.js";
import { Section, sectionKeys } from "../types/section.types";
import DarkModeSwitcher from "./DarkModSwitcher";
import LocaleSwitcher from "./LocaleSwitcher";

export const CustomAppBar = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) => {
  const hash = useHash();
  const pathName = usePathname();
  const router = useRouter();
  const section = hash?.replace("#", "");

  const index = useMemo(() => {
    const i = sectionKeys.indexOf(section as Section);
    return i !== -1 ? i : 0;
  }, [hash]);

  useEffect(() => {
    scrollToSection(
      sectionKeys.includes(section as Section) ? section : sectionKeys[0]
    );
  }, [hash]);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const pathElements = pathName.split("/").filter((el) => el !== "");

    // Maybe changes this case if nextjs supports a hook to listen to hash changes
    if (pathElements.length > 1) {
      // window.location.href = `/${pathElements[0]}#${sectionKeys[index]}`;
      router.push(`/${pathElements[0]}`, { scroll: false });
      setTimeout(() => {
        window.location.hash = `#${sectionKeys[index]}`;
      }, 500);
    } else {
      scrollToSection(sectionKeys[index]);
    }
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (index: number) => {
    const pathElements = pathName.split("/").filter((el) => el !== "");

    // Maybe changes this case if nextjs supports a hook to listen to hash changes
    if (pathElements.length > 1) {
      // window.location.href = `/${pathElements[0]}#${sectionKeys[index]}`;
      router.push(`/${pathElements[0]}`, { scroll: false });
      setTimeout(() => {
        window.location.hash = `#${sectionKeys[index]}`;
      }, 500);
    } else {
      scrollToSection(sectionKeys[index]);
    }
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
        value={index}
      >
        {sectionKeys.map((key, id) => (
          <Tab
            key={key}
            value={id}
            label={dictionary[key]}
            onClick={() => handleTabClick(id)}
          />
        ))}
      </Tabs>
    );
  };

  const renderMenu = () => {
    return (
      <div>
        <List component="nav">
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Menu"
              secondary={dictionary[section as Section]}
            />
          </ListItemButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {sectionKeys.map((option, index) => (
            <MenuItem
              key={option}
              selected={index == sectionKeys.indexOf(section as Section)}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {dictionary[option]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Container>
          <Toolbar
            sx={{
              "@media (min-width: 0px)": { paddingRight: 0, paddingLeft: 0 },
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {isDownSm ? renderMenu() : renderTabs()}
            </Box>
            <LocaleSwitcher />
            <DarkModeSwitcher />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
