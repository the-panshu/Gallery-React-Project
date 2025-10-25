import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [userData, setUserData] = useState([]); //This is going to keep the User Data
  const [index, setIndex] = useState(1); //This is going to keep the page index

  const getData = async () => {
    //Data fetching from the API
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`
    );
    setUserData(response.data);
  };

  useEffect(
    function () {
      //Calling the getData function on every index change
      getData();
    },
    [index]
  );

  let printUserData = (
    <h3 className="text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
      Loading...
    </h3>
  );

  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div key={idx}>
          <Card elem={elem} />
        </div>
      );
    });
  }

  return (
    <div className="bg-black overflow-auto h-screen p-4 text-white">
      <div className="flex h-[82%] flex-wrap gap-4 p-2">{printUserData}</div>

      <div className="flex justify-center gap-6 items-center p-4">
        <button //This button will be disabled on the first page and Used to go to the previous page
          style={{ opacity: index == 1 ? 0.6 : 1 }}
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1); //Decrementing the page index
              setUserData([]); //Clearing the userData to show the loading state
            }
          }}
        >
          Prev
        </button>
        <h4>Page {index}</h4> //Displaying the current page index
        <button //This button is used to go to the next page
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => {
            setUserData([]); //Clearing the userData to show the loading state
            setIndex(index + 1); //Incrementing the page index
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
