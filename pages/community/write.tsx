import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4">
        <TextArea placeholder="Ask a question!" required />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
