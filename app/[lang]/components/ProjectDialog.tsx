"use client";

import { getDictionary } from "@/get-dictionary";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { technologies } from "../types/technologies.types";
import { ProjectItem } from "./sections/Projects";

export type Props = {
  project: ProjectItem;
  open: boolean;
  handleClose: () => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["projects"];
};

export default function ProjectDialog({
  project,
  open,
  handleClose,
  dictionary,
}: Props) {
  const theme = useTheme();
  const { lang } = useParams();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const height = isDownSm ? 200 : 300;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Card>
        <CardMedia
          sx={{ height: height }}
          image={project.img}
          title={project.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            marginBottom={2}
          >
            {project.description}
          </Typography>
          {project.technologies?.map((id) => {
            const technology = technologies.find((x) => x.id === id);
            if (!technology) return <></>;
            return (
              <Stack
                key={technology.id}
                direction="row"
                spacing={1}
                marginBottom={1}
                sx={{ alignItems: "center" }}
              >
                <Image
                  src={technology.img}
                  width={24}
                  height={24}
                  alt={`Icon of ${technology.title}`}
                  style={{
                    display: "block",
                  }}
                />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  {technology.title}
                </Typography>
              </Stack>
            );
          })}
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            onClick={handleClose}
            color="secondary"
            sx={{ marginRight: "auto" }}
          >
            Ok
          </Button>
          {project.github ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                LinkComponent={NextLink}
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          ) : (
            <></>
          )}
          {project.website ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                LinkComponent={NextLink}
                href={`${project.website}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LaunchIcon />
              </IconButton>
            </Stack>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </Dialog>
  );
}
