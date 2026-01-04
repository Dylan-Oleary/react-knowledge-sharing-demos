import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import IFrame from "./IFrame";

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
            <strong>createRoot</strong>: tells React{" "}
            <strong>where to manage the DOM</strong> (ex.{" "}
            <code>&lt;div id="root"&gt;</code>).
          </span>,
          <span>
            <strong>createElement</strong>: returns a{" "}
            <strong>React element object</strong> — a plain JS description of
            what to render.
          </span>,
          <span>
            React uses these element objects to{" "}
            <strong>update the real DOM efficiently</strong> when state changes.
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
    ],
  },
];
