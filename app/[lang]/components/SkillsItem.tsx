"use client";

import { getDictionary } from "@/get-dictionary";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  imagePath: string;
};

export default function SkillsItem({ title, imagePath }: Props) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0.25,
        }}
      >
        <Image
          src={imagePath}
          width={24}
          height={24}
          alt={`Icon of ${title}`}
          style={{
            display: "block",
          }}
        />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          {title}
        </Typography>
      </Box>
      <Divider
        variant="fullWidth"
        sx={{
          bgcolor: theme.palette.secondary.dark,
          borderBottomWidth: "2px",
          borderColor: "#ffffff00",
        }}
      />
    </div>
  );
}
