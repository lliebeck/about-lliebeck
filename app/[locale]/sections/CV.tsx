"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionHeader from "../components/SectionHeader";

export default function CV({}) {
  const appBarTranslation = useTranslations("appBar");
  const t = useTranslations("cv");

  return (
    <Container>
      <SectionHeader id="cv" title={appBarTranslation("cv")} />
      <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
        justifyContent={"center"}
      >
        <Link href={"/assets/cv_german.pdf"} download passHref>
          <Button variant="contained" type="submit" color="secondary">
            {t("downloadGerman")}
          </Button>
        </Link>
        <Link href={"/assets/cv_english.pdf"} download passHref>
          <Button variant="contained" type="submit" color="secondary">
            {t("downloadEnglish")}
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}
