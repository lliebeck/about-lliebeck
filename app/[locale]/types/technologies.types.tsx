export enum Technology {
  NEXTJS = "nextjs",
  REACT = "react",
  JAVASCRIPT = "js",
  TYPESCRIPT = "ts",
  MSQL = "msql",
  CSHARP = "csharp",
  ELECTRON = "electron",
  KOTLIN = "kotlin",
  ANDROID = "android",
  MUI = "mui",
  NODEJS = "nodejs",
  SHADCN = "shadcn",
}

type ITechnology = {
  id: Technology;
  title: string;
  img: string;
};

export const technologies: ITechnology[] = [
  { id: Technology.NEXTJS, title: "Next.js", img: "/icons/nextjs-icon.png" },
  { id: Technology.REACT, title: "React", img: "/icons/react-icon.png" },
  { id: Technology.JAVASCRIPT, title: "JavaScript", img: "/icons/js-icon.png" },
  {
    id: Technology.MUI,
    title: "Material UI",
    img: "/icons/material-ui-icon.png",
  },
  { id: Technology.TYPESCRIPT, title: "TypeScript", img: "/icons/ts-icon.png" },
  { id: Technology.CSHARP, title: "C#", img: "/icons/csharp-icon.png" },
  { id: Technology.MSQL, title: "Microsoft SQL", img: "/icons/msql-icon.png" },
  {
    id: Technology.ELECTRON,
    title: "Electron",
    img: "/icons/electron-icon.png",
  },
  { id: Technology.KOTLIN, title: "Kotlin", img: "/icons/kotlin-icon.png" },
  { id: Technology.ANDROID, title: "Android", img: "/icons/android-icon.png" },
  { id: Technology.NODEJS, title: "Node.js", img: "/icons/node-icon.png" },
  { id: Technology.SHADCN, title: "shadcn", img: "/icons/shadcn-icon.png" },
];
