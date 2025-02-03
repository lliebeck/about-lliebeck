"use client";

import { getDictionary } from "@/get-dictionary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../components/SectionHeader";
import SkillsItem from "../components/SkillsItem";
import { technologies } from "../types/technologies.types";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function CV({
  dictionary,
  dictionarySections,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["cv"];
  dictionarySections: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) {
  return (
    <Container>
      <SectionHeader id="cv" title={dictionarySections.cv} />
      <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
        justifyContent={"center"}
      >
        <Link href={"/assets/cv_german.pdf"} download passHref>
          <Button variant="contained" type="submit" color="secondary">
            {dictionary.downloadGerman}
          </Button>
        </Link>
        <Link href={"/assets/cv_english.pdf"} download passHref>
          <Button variant="contained" type="submit" color="secondary">
            {dictionary.downloadEnglish}
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}
