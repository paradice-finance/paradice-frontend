import React,{ Fragment, useState } from "react";

interface InputTicketProps {
  index: number;
  isDisableRemove: boolean;
  isWiggle: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, key: number) => void;
  onDelete: (key: number) => void;
  onAnimationEnd: (key: number) => void;
}

export function InputTicket({
  index,
  onChange,
  onDelete,
  isDisableRemove,
  isWiggle,
  onAnimationEnd,
}: InputTicketProps) {
  return (
    <div
      className={`bg-inherit border border-[#ED4B9E] rounded-lg mx-1 mb-2`}
      onAnimationEnd={() => {
        onAnimationEnd(index);
      }}
    >
     
        <input
         className="bg-inherit w-4/5 p-1.5 focus:outline-none"
          maxLength={6}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            onChange(event, index);
          }}
        ></input>

        <button
          className="bg-red-600 hover:bg-red-400 ml-2 text-white font-bold h-6 w-6 self-center rounded-full z-0 disabled:bg-gray-300"
          onClick={() => onDelete(index)}
          disabled={isDisableRemove}
        >
          -
        </button>
      </div>
  );
}
