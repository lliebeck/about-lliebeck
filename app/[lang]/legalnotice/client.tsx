"use client";
import { getDictionary } from "@/get-dictionary";
import Typography from "@mui/material/Typography";

export function Client({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["legalNotice"];
}) {
  return <></>;
}
