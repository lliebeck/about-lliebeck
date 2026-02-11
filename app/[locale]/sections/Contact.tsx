"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslations } from "next-intl";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SectionHeader from "../components/SectionHeader";

interface ResponseError extends Error {
  status?: number;
}

type ContactData = {
  name: string;
  email: string;
  message: string;
};

const emailReg = new RegExp(
  "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
);

export default function Contact({}) {
  const { control, handleSubmit, formState, reset } = useForm<ContactData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "all",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const t = useTranslations("contact");
  const appBarTranslation = useTranslations("appBar");

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    if (!formState.isValid) {
      enqueueSnackbar("Please fill out the form", {
        variant: "error",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        const err = new Error(
          `response status: ${response.status}`
        ) as ResponseError;
        err.status = response.status;
        throw err;
      }
      const responseData = await response.json();
      console.log(responseData["message"]);

      reset();
      enqueueSnackbar(t("sendSuccess"), { variant: "success" });
    } catch (err) {
      if (err instanceof Error && (err as ResponseError).status === 429) {
        enqueueSnackbar(t("sendRateLimitError"), {
          variant: "error",
        });
      } else {
        enqueueSnackbar(t("sendError"), {
          variant: "error",
        });
      }
    }
  };

  return (
    <Container sx={{ marginBottom: 6 }}>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        autoHideDuration={5000}
      >
        <SectionHeader id="contact" title={appBarTranslation("contact")} />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack
            direction="column"
            spacing={2}
            paddingLeft={isDownSm ? 0 : "25%"}
            paddingRight={isDownSm ? 0 : "25%"}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t("nameRequired"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label={t("name")}
                  color="secondary"
                  error={error !== undefined}
                  helperText={error ? error.message : null}
                  required
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t("emailRequired"),
                },
                pattern: {
                  value: emailReg,
                  message: t("emailIsInvalid"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label={t("email")}
                  color="secondary"
                  type="email"
                  error={error !== undefined}
                  helperText={error ? error.message : null}
                  required
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t("messageRequired"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  label="Message"
                  multiline
                  rows={5}
                  color="secondary"
                  error={error !== undefined}
                  helperText={error ? error.message : null}
                  required
                />
              )}
            />
            <Button variant="contained" type="submit" color="secondary">
              {t("send")}
            </Button>
          </Stack>
        </form>
      </SnackbarProvider>
    </Container>
  );
}
