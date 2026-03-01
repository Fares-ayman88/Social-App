import { Spinner } from "@heroui/react";
import React from "react";

export default function LooderScreen() {
  return (
    <div className="flex justify-center items-center min-h-[50vh] w-full">
      <div className="surface-card w-full max-w-sm py-7 px-5 flex flex-col items-center">
        <Spinner
          classNames={{ label: "text-[#2d554b] mt-4 font-semibold" }}
          label="Loading..."
          variant="wave"
          size="lg"
        />
      </div>
    </div>
  );
}
