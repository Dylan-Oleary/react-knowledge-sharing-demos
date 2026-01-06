import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import IFrame from "./IFrame";
import Callout from "./Callout";

interface BulletListProps {
  items: ReactNode[];
}

export const BulletList = ({ items }: BulletListProps) => (
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

export interface DetailSlide {
  id: number;
  summary?: ReactNode;
  content: ReactNode[];
  rightSide?: ReactNode[];
  code?: string;
  notes?: string;
}

export interface Topic {
  id: number;
  title: string;
  summary?: ReactNode;
  detailSlides: DetailSlide[];
  isTitle?: boolean;
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "React: Under the Hood",
    summary:
      "A Deep Dive into React Fundamentals\n\nUnderstanding createElement, createRoot, and the Virtual DOM",
    detailSlides: [],
    isTitle: true,
  },
  {
    id: 2,
    title: "What is React?",
    detailSlides: [
      {
        id: 1,
        content: [
          <span>
            <strong>React is a library</strong>, not a full framework.
          </span>,
          <span>
            You can sprinkle React into <strong>parts</strong> of an existing
            app.
          </span>,
          <span>
            It focuses on <strong>UI state and rendering</strong>, not routing
            or data.
          </span>,
          <Callout type="tip">
            React lets you describe what the UI should look like, and it handles
            updating the DOM for you.
          </Callout>,
        ],
        rightSide: [
          <CodeBlock
            code={`<!DOCTYPE html>
<html>
  <head>
    <title>React via CDN</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  </head>
  <body>
    <!-- React does not manage this -->
    <h1>Title</h1>

    <!-- React will manage this div -->
    <div id="root"></div>

    <!-- React does not manage this -->
    <footer>Footer</footer>

    <script>
      const rootElement = document.getElementById("root");
      const root = ReactDOM.createRoot(rootElement);

      root.render(
        React.createElement("h1", null, "Hello from React via CDN!")
      );
    </script>
  </body>
</html>`}
          />,
        ],
      },
      {
        id: 2,
        content: [
          <span>
            <strong>createRoot</strong>: creates a <strong>root object</strong>{" "}
            that manages a DOM node (ex. <code>&lt;div id="root"&gt;</code>).
            <BulletList
              items={[
                "React takes over everything inside this DOM node — anything outside stays untouched.",
                "It sets up the internal structures React needs for reconciliation and rendering.",
              ]}
            />
          </span>,
          <span>
            <strong>createElement</strong>: returns a{" "}
            <strong>React element object</strong> — a plain JS description of
            what the UI should look like.
            <BulletList
              items={[
                <>
                  Each element object has a <code>type</code> (tag or
                  component), <code>props</code> (attributes/children), and{" "}
                  <code>children</code>.
                </>,
                "On each render, React creates a new tree of element objects.",
                "React compares this new tree to the previous one and determines the minimal set of DOM changes.",
              ]}
            />
          </span>,
          <span>
            This lets you <strong>describe the UI</strong> instead of
            manipulating the DOM directly.
          </span>,
        ],
        rightSide: [
          <CodeBlock
            code={`<!-- React + ReactDOM from a CDN -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
></script>

<script>
  // 1️⃣ Find where React should render
  const rootElement = document.getElementById("root");

  // 2️⃣ Tell React to manage that DOM node
  const root = ReactDOM.createRoot(rootElement);

  // 3️⃣ Render a React element tree
  // React.createElement(type, props, ...children)
  root.render(
    React.createElement(
      "h1",       // type: HTML tag or component
      null,       // props: attributes, event handlers, etc.
      "Hello from React via CDN!" // children
    )
  );
</script>`}
          />,
        ],
      },
      {
        id: 3,
        summary: (
          <>
            Source:{" "}
            <a href="/example-1/index.html" target="_blank" rel="noreferrer">
              example-1/index.html
            </a>
            .
          </>
        ),
        content: [],
        rightSide: [
          <IFrame
            src="/example-1/index.html"
            title="React CDN counter demo (example-1/index.html)"
            height={520}
          />,
        ],
      },
      {
        id: 4,
        content: [
          <span>
            <strong>createElement Signature</strong>:{" "}
            <code>React.createElement(type, props, ...children)</code>
            <BulletList
              items={[
                <>
                  <code>type</code>: A string (e.g., <code>"div"</code>,{" "}
                  <code>"h1"</code>) or a component function/class.
                </>,
                <>
                  <code>props</code>: An object of attributes, event handlers,
                  or <code>null</code> if none.
                </>,
                <>
                  <code>children</code>: Zero or more child elements (strings,
                  numbers, or other React elements).
                </>,
              ]}
            />
          </span>,
          <span>
            <strong>What it returns</strong>: A plain JavaScript object
            <BulletList
              items={[
                <>
                  The object has <code>type</code>, <code>props</code>,{" "}
                  <code>key</code>, and <code>ref</code> properties.
                </>,
                <>
                  React uses this object to build the{" "}
                  <strong>virtual DOM</strong>.
                </>,
                "These objects are inexpensive to create.",
              ]}
            />
          </span>,
          <span>
            <strong>Nesting elements</strong>: Children can be other{" "}
            <code>createElement</code> calls.
            <BulletList
              items={[
                "This builds a tree structure that mirrors your UI hierarchy.",
                "JSX compiles down to nested createElement calls.",
              ]}
            />
          </span>,
          <Callout type="info">
            <strong>Key insight:</strong> React elements are immutable snapshots{" "}
            <strong>describing</strong> what the UI should look like at a moment
            in time.
          </Callout>,
        ],
        rightSide: [
          <CodeBlock
            code={`const element = React.createElement(
  "h1",
  { className: "homer" },
  "Bart, put that down!"
);

console.log(element);
// Output:
// {
//   type: "h1",
//   props: {
//     className: "homer",
//     children: "Bart, put that down!"
//   },
//   key: null,
//   ref: null,
//   $$typeof: Symbol(react.element)
// }

// Nested elements
const nested = React.createElement(
  "div",
  { className: "container" },
  React.createElement("button", { onClick: () => alert("WARNING!") }, "Click Me"),
  React.createElement("p", null, "Hello!")
);

console.log(nested);
// Output: 
// {
//   type: "div",
//   props: {
//     className: "container",
//     children: [
//       {
//         type: "button",
//         props: {
//           onClick: () => alert("WARNING!"),
//           children: "Click Me"
//         },
//         key: null,
//         ref: null,
//         $$typeof: Symbol(react.element)
//       },
//       {
//         type: "p",
//         props: { children: "Hello!" },
//         key: null,
//         ref: null,
//         $$typeof: Symbol(react.element)
//       }
//     ]
//   },
//   key: null,
//   ref: null,
//   $$typeof: Symbol(react.element)
// }`}
          />,
        ],
      },
      {
        id: 5,
        summary: (
          <>
            Source:{" "}
            <a href="/example-2/index.html" target="_blank" rel="noreferrer">
              example-2/index.html
            </a>
            .
          </>
        ),
        content: [],
        rightSide: [
          <IFrame
            src="/example-2/index.html"
            title="React element tree demo (example-2/index.html)"
            height={520}
          />,
        ],
      },
    ],
  },
];
