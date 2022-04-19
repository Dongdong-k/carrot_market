import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 xl:place-content-center py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3  min-h-screen">
      <div className="bg-white sm:bg-teal-200 md:bg-red-200 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
        <span className="font-semibold text-2xl">Select Item</span>
        <ul className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between odd:bg-blue-200 even:bg-yellow-50"
            >
              <span className="text-gray-500 dark:text-red-300">
                Grey Chair
              </span>
              <span className="font-semibold text-xl">$14</span>
            </div>
          ))}
        </ul>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span className="">Total</span>
          <span className="font-semibold text-xl">$28</span>
        </div>
        <div className="items-center flex">
          <button className="mt-5 bg-blue-500 dark:bg-black dark:border-white text-white p-3 text-center rounded-xl w-2/4 mx-auto hover:bg-green-400 active:rounded-none">
            Check Out
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden group ">
        <div className="bg-blue-500 p-6 pb-14 xl:pb-40">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 relative -top-5 bg-white">
          <div className="flex justify-between items-end relative -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-28 w-28 bg-blue-200 rounded-full group-hover:bg-red-300 transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-xl font-medium"> Tony Molloy</span>
            <span className="text-sm text-gray-500"> New York, USA</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <span>←</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="shdow-xl p-2 rounded-md">💕</span>
          </div>
        </div>
        <div className="h-72 bg-zinc-400 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-lg">Swoon lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full focus:ring-2 ring-offset-2 ring-yellow-500 bg-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full focus:ring-2 ring-offset-2 ring-indigo-500 bg-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full focus:ring-2 ring-offset-2 ring-teal-500 bg-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-200 flex justify-center items-center aspect-square w-8 rounded-lg text-xl text-gray-500">
                -
              </button>
              <span className="font-semibold">1</span>
              <button className="bg-blue-200 flex justify-center items-center aspect-square w-8 rounded-lg text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 text-center text-white rounded-lg py-2 px-8 text-xs">
              Add to Cart{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-blue-200 p-10 rounded-2xl shadow-xl lg:col-span-2 focus-within:border-2 border-blue-600 transition-all">
        <form className="flex flex-col space-y-3 bg-blue-200 ">
          <input
            className="rounded-lg pl-3"
            type={"text"}
            required
            placeholder="User Name"
          />
          <input
            className="rounded-lg pl-3 peer"
            type={"password"}
            required
            placeholder="Password"
          />
          <span className="hidden peer-invalid:text-red-500 peer-invalid:block">
            This input is invalid
          </span>
          <span className="hidden peer-valid:text-teal-500 peer-valid:block">
            Perfect~!!
          </span>
          <input
            type={"submit"}
            value="Login"
            required
            className="bg-white rounded-lg "
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
