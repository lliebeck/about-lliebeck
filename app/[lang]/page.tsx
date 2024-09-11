import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import AboutMe from "./sections/AboutMe";
import Contact from "./sections/Contact";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <Box marginTop="64px">
      <Home dictionary={dictionary.home} />
      <Container>
        <AboutMe
          dictionary={dictionary.aboutMe}
          dictionarySections={dictionary.appBar}
        />
        <Skills
          dictionary={dictionary.skills}
          dictionarySections={dictionary.appBar}
        />
        <Projects
          dictionary={dictionary.projects}
          dictionarySections={dictionary.appBar}
        />
        <Contact
          dictionary={dictionary.contact}
          dictionarySections={dictionary.appBar}
        />
      </Container>
    </Box>
  );
}
