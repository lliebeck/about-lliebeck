import Container from "@mui/material/Container";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import Box from "@mui/material/Box";
import Home from "./components/sections/Home";
import AboutMe from "./components/sections/AboutMe";
import Skills from "./components/sections/Skills";
import Footer from "./components/Footer";

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
      </Container>
      <Footer
        dictionary={dictionary.skills}
        dictionarySections={dictionary.appBar}
      />
    </Box>
  );
}
