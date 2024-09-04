"use client";
import Typography from "@mui/material/Typography";

type Props = {
  servers: any;
};

export const Client = ({ servers }: Props) => {
  return <Typography>{JSON.stringify(servers, undefined, 0)}</Typography>;
};
