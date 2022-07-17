import { createContext } from "react";
import { UserDataInterface, BlogPostTags } from "./utils";

interface ApplicationContext {
    user: UserDataInterface | null;
    tags: BlogPostTags[];
}

export const ApplicationContext = createContext<ApplicationContext>({user: null, tags: []});
