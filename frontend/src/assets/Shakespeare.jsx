import React from 'react';

export default function Shakespeare() {
  const size = 50;
  const radius = size / 2;
  return (
    <svg width={size} height={size}>
      <defs>
        <clipPath id="circleClip">
          <circle cx={radius} cy={radius} r={radius} />
        </clipPath>
      </defs>
      <image
        href="./shakespeare.ico"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#circleClip)"
      />
    </svg>

  );
}
