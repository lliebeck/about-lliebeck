"use client";

import { getDictionary } from "@/get-dictionary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SectionHeader from "../components/SectionHeader";
import SkillsItem from "../components/SkillsItem";
import { technologies } from "../types/technologies.types";

export default function Skills({
  dictionary,
  dictionarySections,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["skills"];
  dictionarySections: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) {
  return (
    <Container sx={{ marginBottom: 6 }}>
      <SectionHeader id="skills" title={dictionarySections.skills} />
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
