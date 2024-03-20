import Chat from "@/components/Chat";
import ChatBox from "@/components/ChatBox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/router";
import Dashboard from "..";
import { api } from "../../../../convex/_generated/api";

import { toast } from "sonner";
function Chats() {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const chats = useQuery(api.chat.getChats, { user: user.id });
  const createChat = useMutation(api.chat.createChat);
  console.log(chats);
  return (
    <Dashboard>
      <div className="h-full mx-auto  flex py-10 px-5 gap-12 ">
        <Card className="min-h-auto bg-transparent w-80 border-none text-white flex flex-col justify-between">
          <div className="grid gap-4">
            {chats?.length !== 0 ? (
              chats?.map((chat) => {
                return <Chat chat={chat} />;
              })
            ) : (
              <div className=" ">No chats</div>
            )}
          </div>
          <Button
            className="rounded-md text-[#1a202c] hover:text-white bg-white"
            size="lg"
            onClick={() => {
              const data = createChat({
                title: "Untitled",
                user: user.id,
              }).then((id) => {
                router.push(`/dashboard/chats/${id}`);
              });
              toast.promise(data, {
                loading: "Creating chat...",
                success: "Chat created",
                error: "Failed to create chat",
              });
            }}
          >
            New Chat
          </Button>
        </Card>
        <div className="flex-1 flex flex-col gap-12">
          {!id ? (
            chats?.length === 0 ? (
              <p>No chats</p>
            ) : (
              <p>Open a chat</p>
            )
          ) : (
            <ChatBox chatId={id[0]} />
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default Chats;
