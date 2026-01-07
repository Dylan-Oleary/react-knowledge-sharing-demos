import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import IFrame from "./IFrame";
import Callout from "./Callout";
import BulletList from "./BulletList";
export interface DetailSlide {
  id: number;
  isTitle?: boolean;
  title?: ReactNode;
  subtitle?: ReactNode;
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
    summary: "A dive into React Fundamentals\n\n",
    detailSlides: [],
    isTitle: true,
  },
  {
    id: 2,
    title: "What is React?",
    detailSlides: [
      {
        id: 0,
        subtitle: "Goals",
        content: [
          <span>Explain what React is (and what it isn’t).</span>,
          <span>
            See how React <strong>describes</strong> UI as plain JS objects.
          </span>,
          <span>
            Learn about the <strong>Virtual DOM</strong> and{" "}
            <strong>reconciliation</strong>
          </span>,
          <span>Go below the build tools!</span>,
        ],
      },
      {
        id: 1,
        subtitle: "Question",
        content: ["What is React?"],
      },
      {
        id: 2,
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
        id: 3,
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
          <Callout type="info">
            <strong>Note:</strong> <code>createElement</code> is effectively the{" "}
            <strong>legacy</strong> mental model. Modern builds typically
            compile JSX to <code>jsx/jsxs</code> (the JSX runtime). We’re using
            <code> createElement</code> for simplicity in examples.
          </Callout>,
          <span>
            This lets you <strong>describe the UI</strong> by creating an
            element tree instead of manipulating the DOM directly.
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
        id: 4,
        subtitle: "Where's the JSX?",
        content: [
          <span>
            <strong>JSX isn’t React</strong>, it’s markup syntax.
            <BulletList
              items={[
                "JSX compiles to function calls (jsx/jsxs) that create React elements.",
                "It exists to make UI code easier to read and write.",
              ]}
            />
          </span>,
          <span>
            It requires a <strong>build tool</strong> (e.g. Babel/Vite) to
            <strong> transpile</strong> JSX into calls that produce element
            objects.
          </span>,
          <span>
            Try it yourself:{" "}
            <a href="https://babeljs.io/repl" target="_blank" rel="noreferrer">
              Babel REPL
            </a>
          </span>,
        ],
        rightSide: [
          <div>
            <div className="code-compare-label">JSX</div>
            <CodeBlock
              code={`function Header() {
  return <h1>Hello</h1>;
}

function App() {
  return (
    <div className="container">
      <Header />
      <p>World</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`}
            />
          </div>,
          <div>
            <div className="code-compare-label">Modern JSX Runtime Output</div>
            <CodeBlock
              code={`// After compilation with modern JSX transform
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function Header() {
  return _jsx("h1", { children: "Hello" });
}

function App() {
  return _jsxs("div", { 
    className: "container", 
    children: [
      _jsx(Header, {}),
      _jsx("p", { children: "World" })
    ] 
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(App, {}));`}
            />
          </div>,
        ],
      },
      {
        id: 5,
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
        id: 6,
        summary: (
          <>
            Source:{" "}
            <a href="/example-2/index.html" target="_blank" rel="noreferrer">
              example-2/index.html
            </a>
            . Open dev tools to see the React element tree
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
      {
        id: 6,
        subtitle: "Summary",
        content: [
          <span>
            React is a <strong>UI library</strong> you can add to your app.
          </span>,
          <span>
            <strong>createRoot</strong> tells React which DOM node it owns.
          </span>,
          <span>
            React creates an element tree that <strong>describes</strong> the UI
          </span>,
          <span>It's all Javascript!</span>,
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Reconciliation",
    detailSlides: [
      {
        id: 1,
        content: [
          <span>
            <strong>Reconciliation</strong> is how React updates the DOM
            efficiently.
          </span>,
          <span>
            On every update, React:
            <BulletList
              items={[
                "Creates a new tree of React elements",
                "Compares it to the previous tree",
                "Finds the smallest set of DOM changes needed",
              ]}
            />
          </span>,
          <span>
            React does <strong>not</strong> re-render the entire page.
          </span>,
        ],
      },
      {
        id: 2,
        content: [
          <span>
            React does <strong>not</strong> diff the real DOM.
          </span>,
          <span>
            It compares two <strong>trees of React elements</strong>:
            <BulletList
              items={[
                "Previous render’s element tree",
                "Next render’s element tree",
              ]}
            />
          </span>,
          <span>
            Reconciliation happens <strong>before</strong> any DOM mutations.
          </span>,
          <Callout type="info">
            DOM updates are the <strong>result</strong> of reconciliation — not
            the input.
          </Callout>,
        ],
      },
      {
        id: 4,
        content: [],
        rightSide: [
          <img
            className="slide-image"
            src="/reconciliation.png"
            alt="React Reconciliation Process diagram"
          />,
        ],
      },
      {
        id: 5,
        subtitle: "Key Reconciliation Principles",
        summary: (
          <>
            A really good overview can be found here:{" "}
            <a
              href="https://cekrem.github.io/posts/react-reconciliation-deep-dive/"
              target="_blank"
              rel="noreferrer"
            >
              https://cekrem.github.io/posts/react-reconciliation-deep-dive/
            </a>
          </>
        ),
        content: [],
      },
    ],
  },
];
