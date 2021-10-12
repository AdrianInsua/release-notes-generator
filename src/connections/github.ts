import { Octokit } from "octokit";

/* Method definitions */

/**
 * Implementation of github connection
 *
 * @see Octokit api
 *
 * @param { string } auth athentacation token
 * @param { string } [baseUrl] root URL for enterprise connections
 */
export function gitHubConnection(auth: string): Octokit;
export function gitHubConnection(auth: string, baseUrl: string): Octokit;

export function gitHubConnection(auth: string, baseUrl?: string): Octokit {
  return new Octokit({ auth, baseUrl });
}
