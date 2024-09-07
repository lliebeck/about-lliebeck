"use client";

import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
}) {
  const theme = useTheme();

  const lightModeTextColor =
    theme.palette.mode === "light"
      ? theme.palette.getContrastText(theme.palette.text.primary)
      : theme.palette.text.primary;

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
      }}
    >
      <Typography variant="h5" color={lightModeTextColor}>
        Lukas Liebeck
      </Typography>
      <Box>
        <IconButton
          LinkComponent={NextLink}
          href="https://github.com/DeveloperGandalf"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          LinkComponent={NextLink}
          href="https://de.linkedin.com/in/lukas-liebeck-45a82b2ba"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Box>
        <Link
          marginRight={1}
          href="/legalnotice"
          component={NextLink}
          variant="body1"
          color={lightModeTextColor}
        >
          {dictionary.legalNotice}
        </Link>
        <Link
          href="/privacypolicy"
          component={NextLink}
          variant="body1"
          color={lightModeTextColor}
        >
          {dictionary.privacyPolicy}
        </Link>
      </Box>
    </Box>
  );
}
