import Link from "next/link";
import { BlogPostData } from "../lib/utils";

import Parser from 'html-react-parser';

interface Props {
  data: BlogPostData;
}
const BlogPostCard = ({ data }: Props) => {
  return (
    <Link href={`/blog/${data.id}`}>
      <div
        className="relative rounded-lg border m-3 w-96 h-64 cursor-pointer
                hover:scale-105 hover:shadow-xl p-2 shadow-lg overflow-hidden"
      >
        <p className="overflow-ellipsis text-xl"><strong>{data.author.username}</strong> - {data.title}</p>
        {/* <p className="overflow-ellipsis">{data.content}</p> */}
        <div className="content overflow-ellipsis">{Parser(data.content)}</div>
      
      </div>
    </Link>
  );
};

export default BlogPostCard;
