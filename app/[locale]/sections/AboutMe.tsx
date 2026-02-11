"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";
import SectionHeader from "../components/SectionHeader";

export default function AboutMe({}) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  // Picture: about_me_pic
  // const imageDim: { width: number; height: number } = useMemo(() => {
  //   if (isDownSm) return { width: 187, height: 300 };
  //   if (isDownMd) return { width: 249, height: 400 };
  //   return { width: 311, height: 500 };
  // }, [isDownMd, isDownSm]);

  // Picture: about_me_pic_v1
  const imageDim: { width: number; height: number } = useMemo(() => {
    if (isDownSm) return { width: 187, height: 233 };
    return { width: 249, height: 311 };
  }, [isDownSm]);

  const t = useTranslations("aboutMe");
  const appBarTranslation = useTranslations("appBar");

  return (
    <Container>
      <SectionHeader id="aboutMe" title={appBarTranslation("aboutMe")} />
      <Box
        sx={{
          display: "flex",
          justifyContent: isDownSm ? "center" : "normal",
          alignItems: "center",
          flexDirection: isDownSm ? "column" : "row",
        }}
      >
        <Box
          width={isDownSm ? "100%" : "50%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              src="/about_me_pic_v1.jpg"
              width={imageDim.width}
              height={imageDim.height}
              alt="Picture of the author"
              style={{
                display: "block",
              }}
            />
          </Box>
        </Box>
        <Box maxWidth={isDownSm ? "100%" : "50%"}>
          <Typography variant="h6" fontFamily={"monospace"}>
            {t("greetings")}
          </Typography>
          <Typography
            variant={"body1"}
            fontFamily={"monospace"}
            sx={{ display: "inline-block" }}
          >
            {t("career")}
          </Typography>
          <Typography
            variant={"body1"}
            fontFamily={"monospace"}
            marginTop={0.5}
            sx={{ display: "inline-block" }}
          >
            {t("hobbies")}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
