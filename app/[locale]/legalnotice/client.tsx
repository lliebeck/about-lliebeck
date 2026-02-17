"use client";
import { useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

export function Client({}) {
  const t = useTranslations("legalNotice");
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const appBarHight = isDownSm ? "56px" : "64px";

  const disclaimer = {
    title: t("disclaimer.title"),
    data: [
      {
        title: t("disclaimer.content.title"),
        paragraphs: [
          t("disclaimer.content.paragraph1"),
          t("disclaimer.content.paragraph2"),
          t("disclaimer.content.paragraph3"),
          t("disclaimer.content.paragraph4"),
          t("disclaimer.content.paragraph5"),
          t("disclaimer.content.paragraph6"),
          t("disclaimer.content.paragraph7"),
          t("disclaimer.content.paragraph8"),
        ],
      },
      {
        title: t("disclaimer.links.title"),
        paragraphs: [
          t("disclaimer.links.paragraph1"),
          t("disclaimer.links.paragraph2"),
          t("disclaimer.links.paragraph3"),
          t("disclaimer.links.paragraph4"),
          t("disclaimer.links.paragraph5"),
        ],
      },
      {
        title: t("disclaimer.copyright.title"),
        paragraphs: [
          t("disclaimer.copyright.paragraph1"),
          t("disclaimer.copyright.paragraph2"),
          t("disclaimer.copyright.paragraph3"),
          t("disclaimer.copyright.paragraph4"),
        ],
      },
      {
        title: t("disclaimer.privacyPolicy.title"),
        paragraphs: [
          t("disclaimer.privacyPolicy.paragraph1"),
          t("disclaimer.privacyPolicy.paragraph2"),
          t("disclaimer.privacyPolicy.paragraph3"),
          t("disclaimer.privacyPolicy.paragraph4"),
          t("disclaimer.privacyPolicy.paragraph5"),
          t("disclaimer.privacyPolicy.paragraph6"),
        ],
      },
    ],
  };

  const supplier = [
    t("supplier.title"),
    t("supplier.name"),
    t("supplier.street"),
    t("supplier.city"),
  ];

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", marginTop: appBarHight }}
    >
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {t("title")}
      </Typography>
      {supplier.map((value) => (
        <Typography key={value} variant="body1">
          {value}
        </Typography>
      ))}
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {t("contact.title")}
      </Typography>
      <Typography variant="body1">{t("contact.phone")}</Typography>
      <Typography variant="body1">{t("contact.email")}</Typography>
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {disclaimer.title}
      </Typography>
      {disclaimer.data.map((item, index) => (
        <div key={index}>
          <Typography variant="body1" marginBottom={1}>
            <strong style={{ marginTop: "8px" }}>{item.title}</strong>
          </Typography>
          {item.paragraphs.map((paragraph, index) => (
            <Typography key={index} variant="body1" marginBottom={1}>
              {paragraph}
            </Typography>
          ))}
        </div>
      ))}
    </Container>
  );
}
