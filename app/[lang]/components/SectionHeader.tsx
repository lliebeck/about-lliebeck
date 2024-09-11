"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

type Props = {
  title: string;
  id: string;
};

export default function AboutMe({ title, id }: Props) {
  const theme = useTheme();
  const appBarHight = "64px";
  const headerMargin = "24px";

  return (
    <Box
      id={id}
      sx={{
        marginTop: 3,
        marginBottom: 3,
        borderWidth: "10px",
        borderColor: theme.palette.secondary.main,
        scrollMarginTop: `calc(${appBarHight} + ${headerMargin})`,
      }}
    >
      <Divider
        variant="fullWidth"
        sx={{
          "&::before, &::after": {
            borderColor: theme.palette.secondary.main,
            borderWidth: "2px",
          },
        }}
      >
        <Typography variant="h5">{title}</Typography>
      </Divider>
    </Box>
  );
}
