import type { ReactNode } from "react";
import BulletList from "./BulletList";

interface CheckpointProps {
  title?: ReactNode;
  points: ReactNode[];
}

export default function Checkpoint({
  title = <>Checkpoint</>,
  points,
}: CheckpointProps) {
  return (
    <div>
      <div>{title}</div>
      <BulletList items={points} />
    </div>
  );
}
