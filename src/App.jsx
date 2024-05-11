import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BoardContext } from "./context/BoardContext";

function App() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: "My Trello Board",
        bgColor: "#069",
        list: [
          {
            id: "1",
            title: "To Do",
            item: [
              {
                id: "crdFt",
                title: "Project Description 1",
              },
            ],
          },
          {
            id: "2",
            title: "In Progress",
            item: [
              {
                id: "crdFv",
                title: "Project Description 2",
              },
            ],
          },
          {
            id: "3",
            title: "Done",
            item: [
              {
                id: "crdFb",
                title: "Project Description 3",
              },
            ],
          },
        ],
      },
    ],
  };

  const [allBoard, setAllBoard] = useState(boardData);

  return (
    <div>
      <Header></Header>
      <BoardContext.Provider value={{ allBoard, setAllBoard }}>
        <div className="content flex">
          <Sidebar></Sidebar>
          <Main></Main>
        </div>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
