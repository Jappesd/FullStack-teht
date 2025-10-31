# 🌐 Web Development Cheat Sheet  
*HTML, CSS, and React basics with short explanations for each common element.*

---

## 🧱 **HTML BASICS**
```html
<!-- The DOCTYPE tells the browser this is an HTML5 document -->
<!DOCTYPE html>

<html lang="en">
  <head>
    <!-- Character encoding (handles special characters like ä, ö, etc.) -->
    <meta charset="UTF-8" />

    <!-- Makes the site responsive on mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>My Page</title>

    <!-- Connects your CSS file -->
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <!-- Header area at the top -->
    <header>
      <h1>Main Title</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>

    <!-- Main content of the page -->
    <main>
      <section>
        <h2>Section Title</h2>
        <p>This is a paragraph.</p>
        <button>Click Me</button>
      </section>
    </main>

    <!-- Footer at the bottom -->
    <footer>
      <p>© 2025 My Website</p>
    </footer>
  </body>
</html>
```

### Common HTML elements
```html
<div></div>   <!-- A general-purpose block container -->
<span></span> <!-- Inline container for text or small items -->
<a href="#">Link</a> <!-- Clickable link -->
<img src="path.jpg" alt="description" /> <!-- Displays an image -->
<ul><li>List Item</li></ul> <!-- Unordered list -->
<input type="text" placeholder="Type here" /> <!-- Text input -->
<form action="#" method="post"></form> <!-- Form for user input -->
```

---

## 🎨 **CSS BASICS**
```css
/* Applies to the whole page */
body {
  font-family: Arial, sans-serif; /* Sets the text font */
  margin: 0;                      /* Removes default outer space */
  padding: 0;                     /* Removes default inner space */
  background-color: #f5f5f5;      /* Sets background color (light gray) */
}

/* A reusable class for wrapping content */
.container {
  width: 80%;           /* How wide the element is, relative to screen width */
  margin: 0 auto;       /* Centers it horizontally */
  padding: 20px;        /* Space inside the box */
}

/* An element with the ID “main-title” */
#main-title {
  color: #333;          /* Text color (dark gray) */
  text-align: center;   /* Centers text horizontally */
}

/* Flexbox layout for aligning items */
.flex {
  display: flex;               /* Enables flex layout */
  justify-content: center;     /* Centers items horizontally */
  align-items: center;         /* Centers items vertically */
  gap: 10px;                   /* Space between items */
}

/* Button styles */
button {
  background-color: #007bff;   /* Button color (blue) */
  color: white;                /* Text color */
  border: none;                /* Removes outline border */
  padding: 8px 16px;           /* Top/bottom 8px, sides 16px */
  border-radius: 8px;          /* Rounded corners */
  cursor: pointer;             /* Shows a pointer when hovering */
}

/* Button hover effect */
button:hover {
  background-color: #0056b3;   /* Darker blue on hover */
}
```

### Common patterns
```css
/* Centers things perfectly */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Makes the layout adapt to smaller screens */
@media (max-width: 600px) {
  .container {
    width: 100%; /* Full width on mobile */
  }
}
```

---

## ⚛️ **REACT BASICS**
```jsx
// Import necessary React hooks
import { useState, useEffect } from 'react';

function App() {
  // useState: keeps track of changing data (like variables)
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  // useEffect: runs code when the component mounts (like setup)
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty array = run only once

  // useEffect: runs every time 'count' changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // Function that runs when the button is clicked
  const handleClick = () => {
    setCount(count + 1);
  };

  // What appears on screen
  return (
    <div className="container">
      <h1>Hello React!</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increase</button>

      {/* Conditional rendering: shows one thing or another */}
      {data.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```

### React quick reference
```jsx
// Shows something only if true
{isVisible && <p>Now you see me</p>}

// Inline styles (use double braces)
<div style={{ color: 'red', padding: '10px' }}>Styled text</div>

// Props: pass values into a component
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}
```
