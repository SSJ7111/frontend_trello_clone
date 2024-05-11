import React, { useContext, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

const Sidebar = () => {
  const blankBoard = {
    name: "",
    bgColor: "#f60000",
    list: [],
  };

  const [boardContent, setBoardContent] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { allBoard, setAllBoard } = useContext(BoardContext);
  const setActiveBoard = (i) => {
    let newBoard = { ...allBoard };
    newBoard.active = i;
    setAllBoard(newBoard);
  };

  const addBoard = () => {
    let newBoard = { ...allBoard };
    newBoard.boards.push(boardContent); // Corrected
    setAllBoard(newBoard);
    setBoardContent(blankBoard);
    setShowPopup(!showPopup);
  };

  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[40px]" : "w-[280px]"
      }`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={20}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="workSpace p-3 flex justify-between border-b border-b-[#9fadbc29]">
            <h4>Remote Dev's Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm p-1"
            >
              <ChevronLeft size={20}></ChevronLeft>
            </button>
          </div>
          <div className="boardList">
            <div className="flex justify-between px-3 py-2">
              <h6>Your Boards</h6>
              <Popover
                isOpen={showPopup}
                align="start"
                positions={["right", "top", "bottom", "left"]} // preferred positions by priority
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded ">
                    <button
                      onClick={() => setShowPopup(!showPopup)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded "
                    >
                      <X size={18}></X>
                    </button>
                    <h4 className="py-3 ">Create Board</h4>
                    <img
                      src="https://placehold.co/200x120/png"
                      alt=""
                      srcset=""
                    />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">
                        Board Title<span>*</span>
                      </label>
                      <input
                        value={boardContent.name}
                        onChange={(e) =>
                          setBoardContent({
                            ...boardContent,
                            name: e.target.value,
                          })
                        }
                        type="text"
                        className="mb-2 h-8 px-2 w-full bg-gray-700 "
                      />
                      <label htmlFor="color">Board Color</label>
                      <input
                        value={boardContent.bgColor}
                        onChange={(e) =>
                          setBoardContent({
                            ...boardContent,
                            bgColor: e.target.value,
                          })
                        }
                        type="color"
                        className="mb-2 h-8 px-2 w-full bg-gray-700 "
                      />
                      <button
                        onClick={() => addBoard()}
                        className="w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowPopup(!showPopup)}
                  className="hover:bg-slate-600 rounded-sm p-1"
                >
                  <Plus size={18}></Plus>
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allBoard.boards &&
              allBoard.boards.map((x, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => {
                        setActiveBoard(i);
                      }}
                      className="px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-700"
                    >
                      <span
                        className="w-6 h-max rounded-sm mr-2"
                        style={{ backgroundColor: `${x.bgColor}` }}
                      >
                        &nbsp;
                      </span>
                      <span>{x.name}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;