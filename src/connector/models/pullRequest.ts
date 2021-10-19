export interface LabelNode {
    name: string;
}
export interface Labels {
    nodes: LabelNode[];
}
export interface PullRequestBase {
    number: number;
    title: string;
    body: string;
    createdAt: string;
}
export interface PullRequest extends PullRequestBase {
    labels: string[];
}
export interface PullRequestResponse extends PullRequestBase {
    labels: Labels;
}
