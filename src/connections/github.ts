import { graphql } from "@octokit/graphql";
import { graphql as IGraphql } from "@octokit/graphql/dist-types/types";

/* Method definitions */

/**
 * Implementation of github connection
 *
 * @see Octokit api
 *
 * @param { string } auth athentacation token
 * @param { string } [baseUrl] root URL for enterprise connections
 */
export function gitHubConnection(auth: string): IGraphql;
export function gitHubConnection(auth: string, baseUrl: string): IGraphql;

export function gitHubConnection(auth: string, baseUrl?: string): IGraphql {
  return graphql.defaults({
    baseUrl,
    headers: {
      authorization: `token ${auth}`,
    },
  });
}
