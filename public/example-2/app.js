const { createElement } = React;
const { createRoot } = ReactDOM;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(createElement(App));

function App() {
  return createElement(
    "div",
    { className: "app-container" },
    createElement("h2", { className: "counter" }, "Counter Demo!"),
    createElement(Counter)
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  const elementTree = createElement(
    "div",
    { className: "counter" },
    createElement("div", { className: "count" }, count),
    createElement(
      "div",
      null,
      createElement(
        "button",
        { onClick: () => setCount(count - 1) },
        createLabelElement("Decrement")
      ),
      createElement(
        "button",
        { onClick: () => setCount(0) },
        createLabelElement("Reset")
      ),
      createElement(
        "button",
        { onClick: () => setCount(count + 1) },
        createLabelElement("Increment")
      )
    )
  );

  // Log the live element tree on every render
  console.log("🔄 Counter render - current count:", count);
  console.log("📦 React Element Tree:", elementTree);

  return elementTree;
}

function createLabelElement(label) {
  return createElement("span", null, label);
}
