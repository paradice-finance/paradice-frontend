import React from "react";

export default function Container(props: { className?: string, children?: React.ReactNode; }) {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${props.className ? props.className : ""
        }`}>
      {props.children}
    </div>
  );
}
