// Credits from the community "Damage & Emblem Calculator" spreadsheet
// (last updated 30 July 2024) that this calculator is ported from.
// These must stay displayed on the site.

export const SPREADSHEET_NAME = "Damage & Emblem Calculator";
export const SPREADSHEET_LAST_UPDATED = "30 July 2024";

export const SPREADSHEET_CREDITS = [
  { name: "Paulpork", contribution: "The damage formula" },
  { name: "櫻櫻美代套子", contribution: "The initial buffed stats calculator" },
  {
    name: "KaitouKiddo",
    contribution: "The initial damage + emblem calculator",
  },
  {
    name: "殘風⎝( OωO)⎠",
    contribution: "Crit rate and damage cap tests",
  },
  {
    name: "Whaku",
    contribution: "The spreadsheet itself, plus crit rate tests",
  },
  { name: "S3phy", contribution: "Updating the spreadsheet" },
  {
    name: "Noodlesoup",
    contribution: "Testing and correlating empirical data",
  },
  {
    name: "Astralmist",
    contribution: "Datamined defense values and formula",
  },
] as const;
