"use client";

import { getDictionary } from "@/get-dictionary";
import InfoIcon from "@mui/icons-material/Info";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ProjectDialog from "../components/ProjectDialog";
import SectionHeader from "../components/SectionHeader";
import { Technology } from "../types/technologies.types";

export type ProjectItem = {
  title: string;
  description: string;
  github?: string;
  website?: string;
  technologies?: Technology[];
  img: string;
  rows: number;
  cols: number;
};

export default function Projects({
  dictionary,
  dictionarySections,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["projects"];
  dictionarySections: Awaited<ReturnType<typeof getDictionary>>["appBar"];
}) {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const projectItems: ProjectItem[] = [
    {
      img: "/projects/admin_shell.png",
      title: dictionary.adminShell.title,
      description: dictionary.adminShell.description,
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
      title: dictionary.trashTracker.title,
      description: dictionary.trashTracker.description,
      technologies: [Technology.CSHARP, Technology.KOTLIN, Technology.ANDROID],
      rows: isDownSm ? 4 : 3,
      cols: isDownSm ? 6 : 2,
    },
    {
      img: "/projects/battlefield_lobby.png",
      title: dictionary.myBattlefieldLobby.title,
      description: dictionary.myBattlefieldLobby.description,
      technologies: [
        Technology.REACT,
        Technology.NEXTJS,
        Technology.TYPESCRIPT,
        Technology.MUI,
      ],
      github: "https://github.com/DeveloperGandalf/battlefield-tracker",
      website: "https://mygamelobby.de/",
      rows: 2,
      cols: isDownSm ? 6 : 4,
    },
    {
      img: "/projects/veda_time_tracker.png",
      title: dictionary.timeTracker.title,
      description: dictionary.timeTracker.description,
      technologies: [
        Technology.REACT,
        Technology.ELECTRON,
        Technology.TYPESCRIPT,
        Technology.MUI,
      ],
      rows: isDownSm ? 2 : 1,
      cols: isDownSm ? 6 : 2,
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
      <SectionHeader id="projects" title={dictionarySections.projects} />
      <ImageList
        sx={{ width: "100%", maxHeight: "calc(100vh - 88px - 90px)" }}
        variant="quilted"
        cols={6}
        rowHeight={rowHeight}
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
