
import React from "react";
import ConversationView from "@/components/custom/CoversationView";
import Header from "@/global/AppHeader";
import { useSolution } from "@/context/SolutionContext";
import { useNavigate, useParams } from "react-router-dom";

const Solution = () => {

  const {
    currentConversation,
    setCurrentId,
  } = useSolution()

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()


  React.useEffect(() => {
    if (id) {
      setCurrentId(id)
    }
  }, [id, navigate])



  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex-1 overflow-y-auto p-4">
        <ConversationView c={currentConversation} />
      </div>
    </div>
  )

}

export default Solution;


