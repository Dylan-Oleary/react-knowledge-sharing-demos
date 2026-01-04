const { createElement } = React;
const { createRoot } = ReactDOM;

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(createElement(App));

function App() {
  // createElement('element type', 'props', ...'children')
  return createElement(
    "div",
    { className: "app-container" },
    createElement("h2", { className: "counter" }, "Counter Demo!"),
    createElement(Counter)
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return createElement(
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
}

function createLabelElement(label) {
  return createElement("span", null, label);
}
