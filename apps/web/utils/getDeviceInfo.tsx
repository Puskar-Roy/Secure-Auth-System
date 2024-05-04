import { detect } from "detect-browser";

export let browserName: string | null;
export let browserVersion: string | null;
export let os: string | null;

if (typeof window !== "undefined") {
  const browser = detect();
  if (browser) {
    browserName = browser.name;
    browserVersion = browser.version;
    os = browser.os;
  }
}
