import React from "react";
import "./App.css";
import List from "./components/List";

function App() {
  return (
    <div className="min-h-screen w-full flex justify-between md:flex-row xs:flex-col-reverse bg-black lg:pr-4 lg:pl-20">
      <div className="border-x border-white h-screen xs:w-full md:w-page md:-mr-10 bg-zinc-950 overflow-y-scroll ">
        <h1 className="text-white font-serif text-4xl text-center m-3">
          Silly Lists
        </h1>
        <List />
      </div>
      <div className="flex justify-around items-center h-fit  w-96 lg:mt-6 ">
        <button className="text-white border-4 border-lime-600 bg-lime-600 font-bold h-12 w-40 rounded">log in</button>
        <button className="text-white border-4 border-lime-600 font-bold h-12 w-40 rounded">Sign up</button>
      </div>
    </div>
  );
}

export default App;
