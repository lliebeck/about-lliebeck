"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTranslations } from "next-intl";
import SectionHeader from "../components/SectionHeader";
import SkillsItem from "../components/SkillsItem";
import { technologies } from "../types/technologies.types";

export default function Skills({}: {}) {
  const appBarTranslation = useTranslations("appBar");

  return (
    <Container sx={{ marginBottom: 6 }}>
      <SectionHeader id="skills" title={appBarTranslation("skills")} />
      <Grid container columnSpacing={3} rowSpacing={1}>
        {technologies.map((technology) => (
          <Grid key={technology.id} size={{ xs: 12, sm: 6 }}>
            <SkillsItem title={technology.title} imagePath={technology.img} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
