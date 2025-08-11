import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Conversation } from "@/api/types";
import { useChat } from "@/context/ChatContext";
import { useLocation, useNavigate } from "react-router-dom";
import { groupConversations } from "@/utils";
import SidebarConversationItem from "@/components/custom/SidbarConversationItem";
import { useCompletion } from "@/context/CompletionContext";
import { useSolution } from "@/context/SolutionContext";
import { Trash2Icon, MessageSquarePlus, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LuminaLogo } from "@/assets";
import SidebarButtonTrigger from "@/components/custom/SidebarButtonTrigger";

const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isChat = location.pathname.startsWith("/chat")
  const isSolution = location.pathname.startsWith("/solution")
  const rootPath = isChat ? "chat" : !isSolution ? "completion" : "solution"

  const {
    conversations,
    clearConversations,
    deleteConversation,
    getNewConversation,
  } = isChat ? useChat() : !isSolution ? useCompletion() : useSolution()

  const grouped = groupConversations(conversations)

  const handleClearConveration = () => {
    clearConversations()
    handleNewConverstion()
  }

  const handleNewConverstion = () => {
    const newId = getNewConversation()
    navigate(`/${rootPath}/${newId}`)
  }

  return (
    <Sidebar className="bg-background" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="px-4 py-3 mb-2">
        <div className="flex items-center justify-between">
          <span className="flex gap-1" >
            <img src={LuminaLogo} />
            <h2 className="text-lg font-semibold text-cyan-700">Lumina</h2>
          </span>
          <SidebarButtonTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <div className="p-2"> */}
        {/*   <Button */}
        {/*     className="w-full bg-orange-500 hover:bg-orange-700 text-white" */}
        {/*     onClick={() => navigate("/solution")} */}
        {/*   > */}
        {/*     <MessageSquare /> */}
        {/*     Go to Solution */}
        {/*   </Button> */}
        {/* </div> */}
        {/**/}
        {/* <div className="p-2"> */}
        {/*   <Button */}
        {/*     className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" */}
        {/*     onClick={isChat ? () => navigate("/completion") : () => navigate("/chat")} */}
        {/*   > */}
        {/*     {isChat ? <Sparkles className="h-4 w-4" /> : <MessageSquare />} */}
        {/*     Go to {isChat ? "Completion" : "Chat"} */}
        {/*   </Button> */}
        {/* </div> */}
        {/**/}
        {/* <div className="p-2"> */}
        {/*   <Button */}
        {/*     className="w-full bg-teal-600 hover:bg-teal-700 text-white" */}
        {/*     onClick={handleNewConverstion} */}
        {/*   > */}
        {/*     <MessageSquarePlus className="h-4 w-4" /> */}
        {/*     New {isChat ? "Chat" : "Completion"} */}
        {/*   </Button> */}
        {/* </div> */}
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <SidebarMenu className="p-2">
            {Object.entries(grouped).map(([label, items]) => items.length > 0 && (
              <div key={label} className="mb-2">
                <div className="px-4 py-2 text-sm font-medium text-gray-500">{label}</div>
                {items.map((c: Conversation) => {
                  return (
                    <SidebarConversationItem
                      key={c.id}
                      c={c}
                      root={rootPath}
                      isActive={location.pathname === `/${rootPath}/${c.id}`}
                      onDelete={deleteConversation}
                    />
                  )
                })}
              </div>
            )
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <AlertDialog>
          <AlertDialogTrigger >
            <div
              role="button"
              className="w-full flex justify-center items-center gap-2 cursor-pointer border-1 rounded-md p-1.5 capitalize text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            >
              <Trash2Icon className="!h-4 !w-4" />
              clear all
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your conversations.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-orange-500"
                onClick={() => handleClearConveration()}
              >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}


export default AppSidebar;
