"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { serverClient } from "~/trpc/server";

export default function ListPosts({
    initialPosts,
}: { 
        initialPosts: Awaited<ReturnType<typeof serverClient.post.getAll>>; //set the initialPosts type to the return type of the getAll method.
}) {
    console.log(initialPosts.length, Date.now())
    const [postNames, setPostNames] = useState<Record<number, string>>({});
    const ListPosts = api.post.getAll.useQuery(undefined, {
        initialData: initialPosts,
        refetchOnMount: false, //prevents that the webpage refreshes when the component is mounted.
        refetchOnReconnect: false, //prevents that the webpage refreshes when the connection is reestablished.
    });

    useEffect(() => { //useEffect hook to update the postNames state when the ListPosts query is successful.
            if (ListPosts.isSuccess && ListPosts.data) {
                const initialPostNames = ListPosts.data.reduce((acc: Record<number, string>, post) => {
                    acc[post.id] = post.name || '';
                    return acc;
                }, {});
                setPostNames(initialPostNames);
            }
        }, [ListPosts.isSuccess, ListPosts.data]); // Solo dependemos de isSuccess y data
    

    const setDone = api.post.update.useMutation({ //useMutation hook to update the postNames state when the setDone mutation is successful.
        onSuccess: () => {
            // queryClient.invalidateQueries("posts");
        }
    });

    const handleNameChange = (id: number, newName: string) => {
        setPostNames((prevNames) => ({
            ...prevNames,
            [id]: newName,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => { //function to handle the form submission.
        e.preventDefault();
    };

    return (
        <div>
            <div className="text-black my-5 text-3xl">
                <form onSubmit={handleSubmit} className="mb-4">
                    {ListPosts.isSuccess && ListPosts?.data?.map((publicPost) => (
                        <div key={publicPost.id}>
                            <input
                                id={`check-${publicPost.id}`}
                                value={postNames[publicPost.id] ?? ""}
                                type="text"
                                onChange={(e) => handleNameChange(publicPost.id, e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            >
                            </input>
                            <p className="text-sm text-gray-400">
                                {publicPost.createdAt ? new Date(publicPost.createdAt).toLocaleString() : "Fecha no disponible"}
                                {/*new Date(publicPosts.createdAt).toLocaleString()*/}
                            </p>
                        </div>
                    ))}
                </form>
            </div>
        </div >
    );
}
