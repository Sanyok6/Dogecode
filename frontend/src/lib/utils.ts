export interface UserDataInterface {
    username: string | null;
    is_staff: boolean | null;
    profile_picture: string | null;
}

export interface PageProps {
    csrftoken: string | null;
}

export interface BlogPostTags {
    id: number;
    name: string;
    slug: string;
}
export interface BlogPostData {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string | null;
    author: UserDataInterface;
    tags: Array<BlogPostData>;
}

export interface BlogPostPaginator {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<BlogPostData>;
}
