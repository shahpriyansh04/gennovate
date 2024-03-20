import { useMutation } from "convex/react";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function Chat({ chat }) {
  const [editing, setEditing] = useState(false);
  const updateTitle = useMutation(api.chat.updateChatTitle);
  const router = useRouter();
  const deleteChat = useMutation(api.chat.deleteChat);
  const [title, setTitle] = useState(chat.title);
  return (
    <div className="flex text-lg border rounded-md border-gray-100/50 hover:cursor-pointer w-full items-center justify-between  p-4 ">
      {editing ? (
        <Input
          type="text"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow text-black dark:text-white outline-none mr-2"
        />
      ) : (
        <Link href={`/dashboard/chats/${chat._id}`} className="flex-1">
          {chat.title}
        </Link>
      )}

      <div className="flex items-center gap-2 ">
        {editing ? (
          <button
            onClick={() => {
              const promise = updateTitle({
                chatId: chat._id,
                title: title,
              });
              toast.promise(promise, {
                loading: "Updating title...",
                success: "Title updated",
                error: "Failed to update title",
              });
              setEditing(false);
            }}
            className="text-sm text-white rounded px-2 py-1"
          >
            Submit
          </button>
        ) : (
          <>
            <Edit onClick={() => setEditing(true)} />
            <Trash
              onClick={() => {
                const promise = deleteChat({
                  chatId: chat._id,
                });
                toast.promise(promise, {
                  loading: "Deleting chat...",
                  success: "Chat deleted",
                  error: "Failed to delete chat",
                });
                router.push("/dashboard/chats");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
