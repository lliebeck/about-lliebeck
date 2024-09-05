"use client";

import { getDictionary } from "@/get-dictionary";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SectionHeader from "../SectionHeader";
import Box from "@mui/material/Box";
import SkillsItem from "../SkillsItem";
import Grid from "@mui/material/Grid2";

export default function Skills({
  dictionary,
  dictionarySections,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["skills"];
  dictionarySections: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <SectionHeader id="skills" title={dictionarySections.skills} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="Next.js" imagePath="/icons/nextjs-icon.png" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="React" imagePath="/icons/react-icon.png" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="JavaScript" imagePath="/icons/js-icon.png" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="Microsoft SQL" imagePath="/icons/msql-icon.png" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="TypeScript" imagePath="/icons/ts-icon.png" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SkillsItem title="C#" imagePath="/icons/csharp-icon.png" />
        </Grid>
      </Grid>
    </Container>
  );
}
