import "graphql-import-node";
import { GitHubConnector } from "./connector/github";
import { GithubGenerator } from "./generator/github";
import dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
log4js.configure({
  appenders: { out: { type: "stdout", layout: { type: "coloured" } } },
  categories: { default: { appenders: ["out"], level: "debug" } },
});

const logger = log4js.getLogger("MAIN");

async function main() {
  const connector: GitHubConnector = new GitHubConnector();
  const generator: GithubGenerator = new GithubGenerator(connector);

  logger.debug("Starting pull requests parsing...");

  await generator.generateReleaseNotes();

  logger.debug("Release notes done!");
}

main();
