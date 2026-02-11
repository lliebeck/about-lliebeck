import messages from "./messages/en-us.json";

declare module "next-intl" {
  interface AppConfig {
    // ...
    Messages: typeof messages;
  }
}
