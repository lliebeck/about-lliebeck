"use client";

import InfoIcon from "@mui/icons-material/Info";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import ProjectDialog from "../components/ProjectDialog";
import SectionHeader from "../components/SectionHeader";
import { Technology } from "../types/technologies.types";
import { Link, Typography } from "@mui/material";

export type ProjectItem = {
  title: string;
  description: string | ReactNode;
  github?: string;
  website?: string;
  technologies?: Technology[];
  img: string;
  rows: number;
  cols: number;
};

export default function Projects({}: {}) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const t = useTranslations("projects");
  const appBarTranslation = useTranslations("appBar");

  const projectItems: ProjectItem[] = [
    {
      img: "/projects/admin_shell.png",
      title: t("adminShell.title"),
      description: t("adminShell.description"),
      technologies: [
        Technology.REACT,
        Technology.NEXTJS,
        Technology.TYPESCRIPT,
        Technology.MUI,
      ],
      rows: 2,
      cols: isDownSm ? 6 : 4,
    },
    {
      img: "/projects/trash_tracker.png",
      title: t("trashTracker.title"),
      description: t("trashTracker.description"),
      technologies: [Technology.CSHARP, Technology.KOTLIN, Technology.ANDROID],
      rows: isDownSm ? 4 : 3,
      cols: isDownSm ? 6 : 2,
    },
    {
      img: "/projects/battlefield_lobby.png",
      title: t("myBattlefieldLobby.title"),
      description: t("myBattlefieldLobby.description"),
      technologies: [
        Technology.REACT,
        Technology.NEXTJS,
        Technology.TYPESCRIPT,
        Technology.MUI,
      ],
      github: "https://github.com/lliebeck/battlefield-tracker",
      website: "https://mygamelobby.de/",
      rows: 2,
      cols: isDownSm ? 6 : 4,
    },
    {
      img: "/projects/veda_time_tracker.png",
      title: t("timeTracker.title"),
      description: t("timeTracker.description"),
      technologies: [
        Technology.REACT,
        Technology.ELECTRON,
        Technology.TYPESCRIPT,
        Technology.MUI,
      ],
      rows: isDownSm ? 2 : 1,
      cols: isDownSm ? 6 : 2,
    },
    {
      img: "/projects/redsec_legends.png",
      title: t("redsecLegends.title"),
      description: t("redsecLegends.description"),
      technologies: [
        Technology.REACT,
        Technology.TYPESCRIPT,
        Technology.SHADCN,
      ],
      website: "https://redsec-legends.netlify.app/",
      rows: isDownSm ? 2 : 2,
      cols: isDownSm ? 6 : 2,
    },
    {
      img: "/projects/keyer_control_panel.png",
      title: t("keyerControlPanel.title"),
      description: t.rich("keyerControlPanel.description", {
        Typography: (chunks) => (
          <Typography variant="body2" style={{ marginBlock: "0.5em" }}>
            {chunks}
          </Typography>
        ),
      }),
      technologies: [
        Technology.NODEJS,
        Technology.REACT,
        Technology.TYPESCRIPT,
      ],
      rows: 2,
      cols: isDownSm ? 6 : 4,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(
    projectItems[0]
  );

  const lightModeTextColor =
    theme.palette.mode === "light"
      ? theme.palette.getContrastText(theme.palette.text.primary)
      : theme.palette.text.primary;

  const rowHeight = isDownMd ? 120 : 180;

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const handleClickOpen = (projectItem: ProjectItem) => {
    setSelectedProject(projectItem);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <SectionHeader id="projects" title={appBarTranslation("projects")} />
      <ImageList
        sx={{
          width: "100%",
          //  maxHeight: "calc(100vh - 88px - 90px)"
        }}
        variant="quilted"
        cols={6}
        rowHeight={rowHeight}
        gap={8}
      >
        {projectItems.map((projectItem) => (
          <ImageListItem
            key={projectItem.img}
            cols={projectItem.cols || 1}
            rows={projectItem.rows || 1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...srcset(
                projectItem.img,
                rowHeight,
                projectItem.rows,
                projectItem.cols
              )}
              alt={projectItem.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={projectItem.title}
              position="bottom"
              actionIcon={
                <IconButton
                  onClick={() => handleClickOpen(projectItem)}
                  sx={{ color: lightModeTextColor }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ProjectDialog
        project={selectedProject}
        open={openDialog}
        handleClose={handleClose}
      />
    </Container>
  );
}
