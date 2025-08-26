import type { ReactElement, FC } from "react";
import "./styles.pcss";

type SkeletonProps = {
  width: number | string;
  height: number | string;
};

export const Skeleton: FC<SkeletonProps> = ({ width, height }): ReactElement => {
  return <div style={{ width, height }} className="skeleton" />;
};
