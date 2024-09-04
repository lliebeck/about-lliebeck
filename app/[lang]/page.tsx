import Container from "@mui/material/Container";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import Box from "@mui/material/Box";
import Home from "./components/Home";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <Box>
      <Home dictionary={dictionary.home} />
      <Container fixed></Container>
      <div
        style={{ backgroundColor: "blue", height: "500px", width: "100%" }}
      ></div>
      {/* <Typography>Current locale: {lang}</Typography>
      <Typography>
        This text is rendered on the server:{" "}
        {dictionary["server-component"].welcome}
      </Typography>
      <Counter dictionary={dictionary.counter} /> */}
    </Box>
  );
}
