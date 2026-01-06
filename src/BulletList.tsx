import type { ReactNode } from "react";

interface BulletListProps {
  items: ReactNode[];
}

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px", listStyle: "disc" }}>
      {items.map((item, index) => (
        <li
          key={index}
          style={{ fontSize: "1rem", lineHeight: "1.6", color: "#4b5563" }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
