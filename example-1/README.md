# Example 1: React basics with createElement

## What This Shows

- **No build tools**: React loaded directly from CDN
- **No JSX**: Everything built with `React.createElement()`

## Key Concepts

- `React.createElement(type, props, ...children)` - Creates React elements (virtual DOM objects)
- `ReactDOM.createRoot(element)` - Creates a React root to manage a DOM node
- `root.render(element)` - Tells React to render your component tree into the DOM
- React only controls the `#root` div; everything else is regular HTML

## Demo

Just open `index.html` in a browser - no installation or build step needed.
