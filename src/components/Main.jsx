import React, { useContext } from "react";
import { MoreHorizontal, UserPlus, Edit2 } from "react-feather";
import AddCard from "./AddCard";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import Utils from "../utils/Utils";

const Main = () => {
  const { allBoard, setAllBoard } = useContext(BoardContext);

  const boardData = allBoard.boards[allBoard.active];

  function onDragEnd(res) {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }

    const newList = [...boardData.list];
    const src_id = parseInt(res.source.droppableId);
    const dest_id = parseInt(res.destination.droppableId);

    if (!newList[src_id - 1] || !newList[dest_id - 1]) {
      console.log("Invalid source or destination list");
      return;
    }

    const [removed] = newList[src_id - 1].items.splice(res.source.index, 1);

    if (!newList[dest_id - 1].items) {
      newList[dest_id - 1].items = [];
    }

    newList[dest_id - 1].items.splice(res.destination.index, 0, removed);

    let boardNew = { ...allBoard };
    boardNew.boards[boardNew.active].list = newList;
    setAllBoard(boardNew);
  }

  const cardContent = (e, ind) => {
    const newList = [...boardData.list];
    if (!newList[ind]) {
      newList[ind] = { items: [] };
    }
    if (!newList[ind].items) {
      newList[ind].items = [];
    }
    newList[ind].items.push({ id: Utils.makeId(5), title: e });
    const boardNew = {
      ...allBoard,
    };
    boardNew.boards[boardNew.active].list = newList;
    setAllBoard(boardNew);
  };

  const listData = (e) => {
    let newList = boardData.list.slice();
    newList.push({ id: (newList.length + 1).toString(), title: e, items: [] });

    let boardNew = { ...allBoard };
    boardNew.boards[boardNew.active].list = newList;
    setAllBoard(boardNew);
  };

  return (
    <div
      className="flex flex-col w-full p-3"
      style={{ backgroundColor: `${boardData.bgColor}` }}
    >
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg">{boardData.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 h-8 text-gray-500 px-2 py-1 mr-2 rounded flex justify-center items-center">
            <UserPlus size={18} className="mr-2"></UserPlus>
            Share
          </button>
          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={18}></MoreHorizontal>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {boardData.list &&
              boardData.list.map((x, ind) => {
                return (
                  <div
                    key={ind}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span>{x.title}</span>
                        <button className="hover:bg-gray-500 p-1 rounded-sm">
                          <MoreHorizontal size={18}></MoreHorizontal>
                        </button>
                      </div>
                      <Droppable droppableId={x.id}>
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md  border-2 border-zinc-900 hover:border-gray-500">
                                          <span>{item.title}</span>
                                          <span className="flex justify-start items-start">
                                            <button className="hover:bg-gray-600 p-1 rounded-sm ">
                                              <Edit2 size={18}></Edit2>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      <AddCard getCard={(e) => cardContent(e, ind)}></AddCard>
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
          <AddList getList={(e) => listData(e)}></AddList>
        </div>
      </div>
    </div>
  );
};

export default Main;
