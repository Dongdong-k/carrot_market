import Button from "@components/button";
import { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full bg-slate-300" />
        <label
          htmlFor="picture"
          className="cursor-pointer py-2 px-3 border-gray-300 border rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
        >
          Change Photo
          <input
            id="picture"
            type={"file"}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            required
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-orange-500 text-sm select-none">
            +82
          </span>
          <input
            id="phone"
            type="number"
            required
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-l-none"
          />
        </div>
      </div>
      <Button text="Update Profile" />
    </div>
  );
};

export default EditProfile;
