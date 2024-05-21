"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  // const getAll = api.post.getAll.useQuery();
  const createPost = api.post.create.useMutation({
    /*onSettled: () => { //triggers some functionality when the mutation finishes independently wheter it was success or not.
      getAll.refetch();
    },*/
    onSuccess: () => {//triggers some functionality only when the mutation was success.
      router.refresh();
      setName("");
    },
  });

  return (
    
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if(!name){
          return alert("Please enter a name");
        }
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <p className="text-2xl text-white">Add a new post:</p>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
