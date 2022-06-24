import { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";

const LiveDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="pt-4">
          <h3 className=" text-gray-800 font-semibold text-2xl mt-2">
            Let&apos;s try potatoes
          </h3>
          <div className="py-10 pb-16 px-4 space-y-4 h-[50vh] overflow-y-scroll">
            <Message message="Hi how much are you selling them for?" />
            <Message message="I want ￦20,000" reversed />
            <Message message="미쳤어" />
          </div>
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0 ">
          <div className="flex items-center relative">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveDetail;
