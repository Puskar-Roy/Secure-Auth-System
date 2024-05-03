import { detect } from "detect-browser";

export let browserName: string | null;
export let browserVersion: string | null;
export let os: string | null;
const browser = detect();

if (typeof window !== "undefined") {
  if (browser) {
    browserName = browser.name;
    browserVersion = browser.version;
    os = browser.os;
  }
}
