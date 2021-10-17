export interface LabelNode {
    name: string;
}
export interface Labels {
    nodes: LabelNode[];
}
export interface PullRequest {
    number: number;
    title: string;
    body: string;
    labels: string[] | any;
    createdAt: string;
}
export interface PullRequestResponse extends PullRequest {
    labels: Labels;
}
