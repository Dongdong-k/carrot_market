import { NextPage } from "next";

const LiveDetail: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="pt-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <h3 className=" text-gray-800 font-semibold text-2xl mt-2">
          Let&apos;s try potatoes
        </h3>
        <div className="py-10 pb-16 px-4 space-y-4 h-[50vh] overflow-y-scroll">
          {[1, 1, 1, 1, 1, 1].map((_, i) => (
            <div key={i}>
              <div className="flex items-start space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-500" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border rounded-md border-gray-300">
                  <p>Hi how much are you selling them for?</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 flex-row-reverse space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-gray-500" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border rounded-md border-gray-300">
                  <p>I want ￦20,000</p>
                </div>
              </div>
            </div>
          ))}
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
  );
};

export default LiveDetail;
