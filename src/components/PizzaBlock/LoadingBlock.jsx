import React from "react";
import ContentLoader from "react-content-loader";

function LoadingBlock() {
  return (
    <ContentLoader
      speed={2}
      width={270}
      height={428}
      viewBox="0 0 250 428"
      backgroundColor="#f3f3f3"
      foregroundColor="#e6e6e6"
    >
      <circle cx="125" cy="115" r="115" />
      <rect x="0" y="240" rx="0" ry="0" width="250" height="24" />
      <rect x="0" y="284" rx="0" ry="0" width="250" height="68" />
      <rect x="100" y="371" rx="25" ry="25" width="150" height="42" />
      <rect x="18" y="396" rx="0" ry="0" width="40" height="0" />
      <rect x="0" y="381" rx="4" ry="4" width="89" height="26" />
    </ContentLoader>
  );
}

export default LoadingBlock;
