import { NextPage } from "next";

const Details: NextPage = () => {
  return (
    <div>
      <h4> Details tag</h4>
      <div>
        <details className="select-none open:text-white open:bg-indigo-300">
          <summary className=" cursor-pointer"> summary of details</summary>
          <span>테스트1</span>
          <span className="selection:bg-indigo-300 selection:text-white">
            테스트1
          </span>
        </details>
      </div>
      <div className="">
        <ul className="list-decimal marker:text-teal-200">
          <li>Hi</li>
          <li>Hi</li>
          <li>Hi</li>
        </ul>
      </div>
      <div>
        <input
          type={"file"}
          className="file:cursor-pointer file:hover:text-white file:transition-colors file:border-0 file:rounded-xl file:px-5 file:bg-green-300"
        />
      </div>
    </div>
  );
};

export default Details;
