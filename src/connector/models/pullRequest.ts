export interface LabelNode {
    name: string;
}
export interface Labels {
    nodes: LabelNode[];
}
export interface PullRequestResponse {
    title: string;
    body: string;
    labels: Labels;
    createdAt: string;
}
export interface PullRequest {
    title: string;
    body: string;
    labels: string[];
    createdAt: string;
}
