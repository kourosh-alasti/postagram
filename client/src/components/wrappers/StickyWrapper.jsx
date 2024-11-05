import React from "react";

const StickyWrapper = (props) => {
  return (
    <div className="sticky bottom-12 hidden w-[368px] self-end lg:block">
      <div className="sticky top-20 flex min-h-[calc(100vh-128px)] flex-col gap-y-4">
        {props.children}
      </div>
    </div>
  );
};

export default StickyWrapper;
