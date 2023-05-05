import { Avatar } from "@mui/material";
import "./conversation.css";

export const Conversation = () => {
  return (
    <div className="conversation">
      <Avatar className="conversation-img" src={"https://images.unsplash.com/photo-1677777010475-df7f6a40f45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"} />
      <div className="conversation-name">guneyklcl</div>
    </div>
  );
};