"use client";

import { getDictionary } from "@/get-dictionary";
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
        borderColor: theme.palette.secondary.dark,
        scrollMarginTop: `calc(${appBarHight} + ${headerMargin})`,
      }}
    >
      <Divider
        variant="fullWidth"
        sx={{
          "&::before, &::after": {
            borderColor: theme.palette.secondary.dark,
            borderWidth: "2px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={
            {
              // textDecoration: "underline",
              // textDecorationColor: theme.palette.secondary.dark,
            }
          }
        >
          {title}
        </Typography>
      </Divider>
    </Box>
  );
}
