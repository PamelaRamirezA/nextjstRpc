"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function SearchPost() {
    const [id, setId] = useState("");
    const { data: post, error } = api.post.getById.useQuery(
        { id: id ?? '' },
        {
          enabled: !!id,
        }
      );

    const getPost = async (postId: string) => {
        if (id.trim()) {
            setId(id);
          }
    };

    return (
        <div className="container mx-auto p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!id) {
                        return alert("Please enter a valid id");
                    }
                    if (id.trim()) {
                        console.log(id);
                        getPost(id);
                    }
                }} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <button
                    type="submit"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                //disabled={getPost.isPending}
                >
                    {/* {getPost.isPending ? "Searching..." : "Search"} */}
                    {"Search"}
                </button>
            </form >
            {error && <div className="text-red-500">Error: {error.message}</div>}

            { post && (
                <div>
                    <h1 className="text-xl font-bold">{post.name}</h1>
                    <p>Created at: {new Date(post.createdAt * 1000).toLocaleString()}</p>
                </div>
            )}
        </div>
    );

    // return (
    //     <form className="flex flex-col gap-2">
    //         <div key={post.id} className="flex flex-col gap-2">
    //             <p className="text-lg">{post.name}</p>
    //             <p className="text-sm text-gray-400">
    //                 {post.createdAt ? new Date(publicPosts.createdAt).toLocaleString() : "Fecha no disponible"}
    //                 {/*new Date(publicPosts.createdAt).toLocaleString()*/}
    //             </p>
    //         </div>
    //     </form>
    // );
}
