
import React from "react"
import { Message, Conversation, SolutionType } from "@/api/types";

interface SolutionContextType {
  conversations: Conversation[];
  currentId: string | null;
  setCurrentId: (id: string) => void;
  clearConversations: () => void;
  getCurrentConversation: () => Conversation | null;
  getNewConversation: () => string;
  currentConversation: Conversation | null;
  deleteConversation: (id: string) => void;

  isLoading: boolean;
}

const SolutionContext = React.createContext<SolutionContextType | undefined>(undefined)

export const SolutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = React.useState<Conversation[]>([])
  const [currentId, setCurrentId] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const fetchSolutions = async () => {
    fetch("http://localhost:8000/solution", {
      method: "GET"
    }).then(data => data.json()).then(json => {
      const solutions: SolutionType[] = json.data
      const convs: Conversation[] = solutions.map(s => {
        return {
          id: `${s.id}`,
          title: s.title,
          messages: [{
            content: s.content,
            created_at: s.created_at,
            updated_at: s.created_at,
            creator: "",
            role: "assistant",
          }],
          created_at: s.created_at,
          updated_at: s.created_at,
        }
      })
      setConversations(convs)
    })
  }

  React.useEffect(() => {
    fetchSolutions()
  }, [])

  const getCurrentConversation = (): Conversation | null => {
    return conversations.find((c: Conversation) => c.id === currentId) || null;
  }

  const deleteConversation = (id: string) => {
    setConversations((prevConvs) =>
      prevConvs.filter((c: Conversation) => c.id !== id)
    )
  }

  const getNewConversation = (): string => {
    return "string"
  }


  const addMessageToCurrent = (message: Message) => {
    setConversations((prev: Conversation[]) =>
      prev.map((conv: Conversation) => {
        if (conv.id === currentId) {
          return { ...conv, messages: [...conv.messages, message], updated_at: Date.now() }
        } else {
          return conv
        }
      })
    )
  }
  const updateLastAssistantMessage = (content: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== currentId) return conv;
        const updated = [...conv.messages];
        const last = updated[updated.length - 1];
        if (last?.role === "assistant") {
          updated[updated.length - 1] = {
            ...last,
            content: last.content + content,
            updated_at: Date.now(),
          };
        }
        return { ...conv, messages: updated, updated_at: Date.now() };
      })
    );
  };

  const clearConversations = () => {
    setConversations([]);
    setCurrentId(null)
  }



  const value = {
    conversations,
    currentConversation: getCurrentConversation(),
    currentId,
    setCurrentId,
    addMessageToCurrent,
    updateLastAssistantMessage,
    getNewConversation,
    clearConversations,
    getCurrentConversation,
    deleteConversation,

    isLoading

  }

  return (
    <SolutionContext.Provider value={value}>
      {children}
    </SolutionContext.Provider>
  )
}

export const useSolution = () => {
  const ctx = React.useContext(SolutionContext);
  if (!ctx) throw new Error("useSolution must be used within SolutionProvider")
  return ctx
}


