"use client";

import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import SectionHeader from "../SectionHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Container from "@mui/material/Container";
import { useMemo } from "react";

export default function AboutMe({
  dictionary,
  dictionarySections,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["aboutMe"];
  dictionarySections: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const imageDim: { width: number; height: number } = useMemo(() => {
    if (isDownSm) return { width: 187, height: 300 };
    if (isDownMd) return { width: 249, height: 400 };
    return { width: 311, height: 500 };
  }, [isDownMd, isDownSm]);

  return (
    <Container>
      <SectionHeader id="aboutMe" title={dictionarySections.aboutMe} />
      <Box
        sx={{
          display: "flex",
          justifyContent: isDownSm ? "center" : "space-between",
          alignItems: "center",
          flexDirection: isDownSm ? "column" : "row",
        }}
      >
        <Box
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "2px solid",
            borderColor: theme.palette.secondary.dark,
            marginBottom: isDownMd ? 1 : 0,
          }}
        >
          <Image
            src="/profile_pic_2.jpg"
            width={imageDim.width}
            height={imageDim.height}
            alt="Picture of the author"
            style={{
              display: "block",
            }}
          />
        </Box>
        <Box maxWidth={isDownSm ? "100%" : "50%"}>
          <Typography variant="h6" fontFamily={"monospace"}>
            {dictionary.greetings}
          </Typography>
          <Typography
            variant={"body1"}
            fontFamily={"monospace"}
            sx={{ display: "inline-block" }}
          >
            {dictionary.career}
          </Typography>
          <Typography
            variant={"body1"}
            fontFamily={"monospace"}
            marginTop={0.5}
            sx={{ display: "inline-block" }}
          >
            {dictionary.hobbies}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
