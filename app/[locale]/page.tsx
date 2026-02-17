import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "../i18n/i18n-config";
import AboutMe from "./sections/AboutMe";
import Contact from "./sections/Contact";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <Box marginTop="64px">
      <Home />
      <Container>
        <AboutMe />
        <Skills />
        <Projects />
        {/* <CV dictionary={dictionary.cv} dictionarySections={dictionary.appBar} /> */}
        <Contact />
      </Container>
    </Box>
  );
}
