import type { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success" | "tip";
}

const Callout = ({ children, type = "info" }: CalloutProps) => {
  const bgColors = {
    info: "#e3f2fd",
    warning: "#fff3e0",
    success: "#e8f5e8",
    tip: "#f3e5f5",
  };

  const borderColors = {
    info: "#1976d2",
    warning: "#f57c00",
    success: "#388e3c",
    tip: "#7b1fa2",
  };

  return (
    <div
      className="callout"
      style={{
        backgroundColor: bgColors[type],
        border: `1px solid ${borderColors[type]}`,
        borderLeft: `4px solid ${borderColors[type]}`,
        borderRadius: "4px",
        padding: "12px 16px",
        marginTop: "16px",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      {children}
    </div>
  );
};

export default Callout;
