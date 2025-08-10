import { splitTextByContentType } from "@/utils"
import MarkdownView from "./MarkdownView"
import ReasoningView from "./ReasoningView"

const AssistantMessageView2 = ({ m }: { m: string }) => {
  const parts = splitTextByContentType(m)
  return (
    <div>
      {parts.map((part, index) => {
        if (part.type === "think") {
          return <ReasoningView key={index} text={part.text} />
        } else {
          return <MarkdownView key={index} text={part.text} />
        }
      })}
    </div>
  )
}


export default AssistantMessageView2;
