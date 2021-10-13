import "graphql-import-node";
import { GitHubParser } from "./parser/github";
import { Parser } from "./parser/parser";
import dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
log4js.configure({
  appenders: { out: { type: "stdout", layout: { type: "coloured" } } },
  categories: { default: { appenders: ["out"], level: "debug" } },
});

const logger = log4js.getLogger("MAIN");

const parser: Parser = new GitHubParser();

parser.connect();

async function main() {
  const pullRequests = await parser.getPullRequests();

  logger.info(pullRequests);
}

main();
