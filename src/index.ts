import "graphql-import-node";
import { GitHubParser } from "./parser/github";
import { Parser } from "./parser/parser";
import {Release} from "./parser/models/release";
import {PullRequest} from "./parser/models/pullRequest";
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
  const latestRelease: Release = await parser.getLatestRelease();
  console.log(latestRelease)
  const pullRequests: PullRequest[] = await parser.getPullRequests(latestRelease.createdAt);

  logger.info(pullRequests);
}

main();
