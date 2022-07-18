import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import MessageInput from "@components/messageInput";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="Steve">
      <div className="py-10 px-4 space-y-4">
        <Message message="Hi how much are you selling them for?" />
        <Message message="I want ￦20,000" reversed />
        <Message message="미쳤어" />
        <MessageInput />
      </div>
    </Layout>
  );
};

export default ChatDetail;
