import React, { useState } from "react";
import { X, Plus } from "react-feather";

const AddCard = (props) => {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);
  
  const saveCard = () => {
    if (!card) {
      return;
    }

    props.getCard(card);
    setCard("");
    setShow(false); // Changed to `false` directly
  };

  const closeBtn = () => {
    setShow(false); // Changed to `false` directly
    setCard("");
  };

  return (
    <div>
      <div className="flex flex-col">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Enter Card Title"
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={() => saveCard()}
                className="py-1 px-2 rounded bg-sky-800 text-white mr-2"
              >
                Add Card
              </button>
              <button
                onClick={() => closeBtn()}
                className="p-1 rounded hover:bg-gray-600"
              >
                <X size={18}></X>
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8"
          >
            <Plus size={18}></Plus> Add a Card
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCard;