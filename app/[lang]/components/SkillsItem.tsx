"use client";

import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

type Props = {
  title: string;
  imagePath: string;
};

export default function SkillsItem({ title, imagePath }: Props) {
  const theme = useTheme();

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
          bgcolor: theme.palette.secondary.main,
          borderBottomWidth: "2px",
          borderColor: "#ffffff00",
        }}
      />
    </div>
  );
}
