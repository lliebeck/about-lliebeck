import { Client } from "./client";

async function fetchServers() {
  const data = await fetch(
    "https://api.gametools.network//bf1/servers?name=bob"
  );
  return data.ok ? data.json() : undefined;
}

export default async function Page() {
  const servers = await fetchServers();
  return <Client servers={servers} />;
}
