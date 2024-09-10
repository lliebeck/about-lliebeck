"use client";

import { useEffect, useRef, useState } from "react";
import { type getDictionary } from "../../../../get-dictionary";
import * as THREE from "three";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";
import Box from "@mui/material/Box";
import { PaletteMode, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

export default function Home({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["home"];
}) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const theme = useTheme();
  const [prevMode, setPrevMode] = useState<PaletteMode>();
  const typographyVariant = useMediaQuery(theme.breakpoints.down("xl"))
    ? "h5"
    : "h4";

  const appBarHight = "64px";

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect || prevMode !== theme.palette.mode) {
      setVantaEffect(() =>
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          points: 12.0,
          maxDistance: 22.0,
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.mode === "dark" ? 0x2a282a : 0xd4d4d4,
        })
      );
      setPrevMode(theme.palette.mode);
    }
    return () => {
      // @ts-ignore
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [prevMode, theme.palette.mode, theme.palette.secondary.main, vantaEffect]);

  return (
    <Box id="home" ref={vantaRef} sx={{ height: "100vh", width: "100%" }}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          height: `calc(100vh - ${appBarHight})`,
          justifyContent: isDownSm ? "center" : "space-between",
          flexDirection: isDownSm ? "column-reverse" : "row",
        }}
      >
        <Box margin={isDownMd ? 5 : 0}>
          <Typography variant={typographyVariant} fontFamily={"monospace"}>
            {dictionary.hi}
          </Typography>
          <Typography variant={typographyVariant} fontFamily={"monospace"}>
            {dictionary.self}
          </Typography>
          <Typography variant={typographyVariant} fontFamily={"monospace"}>
            {dictionary.job}
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "2px solid",
            borderColor: theme.palette.secondary.main,
          }}
        >
          <Image
            src="/profile_pic_v1.jpg"
            width={isDownMd ? 300 : 500}
            height={isDownMd ? 300 : 500}
            alt="Picture of the author"
            style={{
              display: "block",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
