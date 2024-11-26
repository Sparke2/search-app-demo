export type TreeNode = {
    key: string;
    label: string;
    searchKey?: string;
    children?: TreeNode[];
    childrenLen?: number;
};
