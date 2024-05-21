import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import ListPosts from "~/app/_components/list-post";
import { SearchPost } from "~/app/_components/search-post";
import { serverClient } from "~/trpc/server";

export default async function Home() {
  const hello = await serverClient.post.hello({ text: "Pamela" });
  const posts = await serverClient.post.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          List of <span className="text-[hsl(100,100%,70%)]">Public posts </span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>
        {/* <CrudShowcase /> */}
      <p className="text-2xl text-white">These are your publicPosts</p>
      <ListPosts initialPosts={posts}/>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   return (
//     <div className="w-full max-w-xs">  
//       <CreatePost />
//       <SearchPost />
//     </div>
//   );
// }
