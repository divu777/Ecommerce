import React, { useRef, useEffect } from "react";
import { SVGText } from "react-svg-text";

const TextAnimation = ({ text }: { text: string }) => {
  const pathRef = useRef<any>(null);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();

      pathRef.current.style.strokeDasharray = pathLength.toString();
      pathRef.current.style.strokeDashoffset = pathLength.toString();
      pathRef.current.style.animation = `drawLine 2s ease-in-out forwards`;
    }
  }, []);

  return (
    <SVGText>
      <textPath
        ref={pathRef}
        startOffset="50%"
        textAnchor="middle"
        fontSize="400"
        fill="transparent"
        stroke="#2202ED"
        strokeWidth="2"
      >
        {text}
      </textPath>
    </SVGText>
  );
};

export default TextAnimation;
