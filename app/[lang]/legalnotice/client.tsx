"use client";
import { getDictionary } from "@/get-dictionary";
import { CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function Client({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["legalNotice"];
}) {
  const content = Object.entries(dictionary.disclaimer.content);
  const supplier = Object.entries(dictionary.supplier);

  const renderDisclaimerParagraph = (content: [string, string][]) => {
    return content.map((value) => (
      <Typography key={value[0]} variant="body1" marginBottom={1}>
        {value[0] === "title" ? (
          <strong style={{ marginTop: "8px" }}>{value[1]}</strong>
        ) : (
          value[1]
        )}
      </Typography>
    ));
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", marginTop: "64px" }}
    >
      {/* <Card sx={{ marginTop: 1, marginBottom: 1 }}>
        <CardContent> */}
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.title}
      </Typography>
      {supplier.map((value) => (
        <Typography key={value[0]} variant="body1">
          {value[1]}
        </Typography>
      ))}

      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.contact.title}
      </Typography>
      <Typography variant="body1">{dictionary.contact.phone}</Typography>
      <Typography variant="body1">{dictionary.contact.email}</Typography>
      {/* </CardContent>
      </Card> */}
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.disclaimer.title}
      </Typography>
      {renderDisclaimerParagraph(Object.entries(dictionary.disclaimer.content))}
      {renderDisclaimerParagraph(Object.entries(dictionary.disclaimer.links))}
      {renderDisclaimerParagraph(
        Object.entries(dictionary.disclaimer.copyright)
      )}
      {renderDisclaimerParagraph(
        Object.entries(dictionary.disclaimer.privacyPolicy)
      )}

      {/* {content.map((value) => (
        <Typography key={value[0]} variant="body1" marginBottom={1}>
          {value[0] === "title" ? <strong>{value[1]}</strong> : value[1]}
        </Typography>
      ))} */}
    </Container>
  );
}
