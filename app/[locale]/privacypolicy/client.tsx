"use client";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

export function Client({}) {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const t = useTranslations("privacyPolicy");

  const appBarHight = isDownSm ? "56px" : "64px";

  const renderParagraphs = () => {
    const items = [
      { title: t("revocation.title"), paragraph: t("revocation.paragraph1") },
      { title: t("complaint.title"), paragraph: t("complaint.paragraph1") },
      {
        title: t("dataPortability.title"),
        paragraph: t("dataPortability.paragraph1"),
      },
      { title: t("information.title"), paragraph: t("information.paragraph1") },
      { title: t("encryption.title"), paragraph: t("encryption.paragraph1") },
    ];

    return items.map((item, index) => (
      <div key={index}>
        <Typography variant="body1" marginBottom={1}>
          <strong style={{ marginTop: "8px" }}>{item.title}</strong>
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          {item.paragraph}
        </Typography>
      </div>
    ));
  };

  const renderResponsibleAuthority = () => {
    const paragraphs = [
      t("responsibleAuthority.paragraph1"),
      t("responsibleAuthority.author"),
      t("responsibleAuthority.street"),
      t("responsibleAuthority.city"),
      t("responsibleAuthority.email"),
      t("responsibleAuthority.paragraph2"),
    ];

    return (
      <>
        <Typography variant="body1" marginBottom={1}>
          <strong>{t("responsibleAuthority.title")}</strong>
        </Typography>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" marginBottom={1}>
            {paragraph}
          </Typography>
        ))}
      </>
    );
  };

  const renderLogs = () => {
    const keyPoints = [
      t("logs.data.domain"),
      t("logs.data.date"),
      t("logs.data.browser"),
      t("logs.data.os"),
      t("logs.data.referrer"),
      t("logs.data.hostname"),
      t("logs.data.ip"),
    ];

    return (
      <>
        <Typography variant="body1" marginBottom={1}>
          <strong>{t("logs.title")}</strong>
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          {t("logs.paragraph1")}
        </Typography>
        <ul>
          {keyPoints.map((keyPoint) => (
            <li key={keyPoint}>
              <Typography
                key={keyPoint}
                variant="body1"
                marginTop={1}
                marginBottom={1}
              >
                {keyPoint}
              </Typography>
            </li>
          ))}
        </ul>
        <Typography variant="body1" marginTop={1} marginBottom={1}>
          {t("logs.paragraph2")}
        </Typography>
      </>
    );
  };

  const renderContactForm = () => {
    const paragraphs = [
      t("contactForm.paragraph1"),
      t("contactForm.paragraph2"),
      t("contactForm.paragraph3"),
    ];

    return (
      <>
        <Typography variant="body1" marginBottom={1}>
          <strong style={{ marginTop: "8px" }}>{t("contactForm.title")}</strong>
        </Typography>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" marginBottom={1}>
            {paragraph}
          </Typography>
        ))}
      </>
    );
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", marginTop: appBarHight }}
    >
      <Typography variant="h5" marginBottom={1} marginTop={2}>
        <strong>{t("title")}</strong>
      </Typography>
      <Typography variant="h6" marginBottom={1}>
        <strong>{t("subtitle")}</strong>
      </Typography>
      {renderResponsibleAuthority()}
      {renderParagraphs()}
      {renderLogs()}
      {renderContactForm()}
      <Typography>
        {t("source")}
        <Link
          href="https://www.hub24.de"
          component={NextLink}
          variant="body1"
          color="secondary"
        >
          Herold Unternehmensberatung
        </Link>
      </Typography>
    </Container>
  );
}
