declare module "react-svg-text" {
  import * as React from "react";

  export interface TextPathProps extends React.SVGProps<SVGTextPathElement> {
    startOffset?: string;
    textAnchor?: string;
    fontSize?: string | number;
  }

  export const SVGText: React.FC<{ children: React.ReactNode }>;
  export const TextPath: React.FC<TextPathProps>;
}
