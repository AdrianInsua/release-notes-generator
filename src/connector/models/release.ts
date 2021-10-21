export interface Release {
    createdAt: string;
    tagName: string;
}

export interface ReleaseNode {
    nodes: Release[];
}
