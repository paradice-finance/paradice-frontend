import React, { Fragment, useState } from "react";

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
      className={`${
        isWiggle && "animate-wiggle"
      } border border-[#ED4B9E] rounded-lg outline outline-pink-500/[.25] mx-1 mb-2`}
      onAnimationEnd={() => {
        onAnimationEnd(index);
      }}
    >
      <div className="flex justify-between align-middle py-1 px-1">
        <div className="   block">{`{ ${index} } -`}</div>
        <input
          className="bg-none border text-sm text-[#280D5F] focus:outline-none focus:placeholder:text-transparent z-10"
          placeholder="0"
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
    </div>
  );
}
