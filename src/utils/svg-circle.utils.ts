import pathParser from "parse-svg-path";
import { SvgCircleElement, SvgElementType } from "../signature.types";
import { normalizePath } from "./svg-path.utils";

export const buildCircleElementFromSingleTapPath = ({
  d = "",
  strokeColor = "black",
  strokeWidth = 1,
}): SvgCircleElement => {
  const commands = pathParser(normalizePath(d));
  const [firstCommand] = commands;
  const [_command, cx, cy] = firstCommand;

  return {
    type: SvgElementType.circle,
    cx,
    cy,
    radius: strokeWidth / 2,
    fill: strokeColor,
    strokeColor,
    strokeWidth: 0,
    id: Date.now(),
  };
}; 