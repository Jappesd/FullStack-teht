# 🚀 Tailwind CSS Crash Sheet

A quick reference for common Tailwind utilities and concepts.

---

## ⚙️ Setup (React / Vite Example)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧩 Core Utility Categories

### 🎨 Colors
```html
bg-blue-500
text-gray-700
border-red-400
hover:bg-blue-600
```
- Shades go from `50` (lightest) → `900` (darkest)

---

### 🧱 Spacing
| Type | Example | Description |
|------|----------|-------------|
| Padding | `p-4` `px-6` `py-2` | Padding |
| Margin | `m-4` `mt-2` `mx-auto` | Margin |
| Gap | `gap-4` | Spacing in flex/grid |

---

### ✍️ Typography
```html
text-sm text-lg text-2xl
font-bold font-semibold
italic underline tracking-wide leading-relaxed
text-center text-right
```

---

### 🧭 Layout & Position
```html
flex items-center justify-between
grid grid-cols-3 gap-4
absolute top-0 left-0
w-full max-w-md mx-auto
```

---

### 🟦 Borders, Radius & Shadow
```html
border border-gray-300
rounded rounded-lg rounded-full
shadow shadow-md shadow-lg
```

---

### 📱 Responsive Design
| Prefix | Min Width | Example |
|---------|------------|----------|
| `sm:` | 640px | `sm:text-lg` |
| `md:` | 768px | `md:flex` |
| `lg:` | 1024px | `lg:w-1/2` |
| `xl:` | 1280px | `xl:px-10` |

Example:
```html
<p class="text-sm md:text-base lg:text-xl">
  Responsive text
</p>
```

---

### ⚡ State Modifiers
```html
hover:bg-blue-600
focus:ring-2
active:scale-95
disabled:opacity-50
```

---

### 🌗 Dark Mode
Enable in config:
```js
darkMode: 'media' // or 'class'
```
Usage:
```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
```

---

### 🔁 Transitions & Animations
```html
transition duration-300 ease-in-out
hover:scale-105 hover:rotate-3
```

---

### 🧠 Custom Components (React)
```jsx
const Button = ({ children }) => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    {children}
  </button>
);
```

---

### 💡 Pro Tips
- Use **Tailwind IntelliSense** in VSCode for autocompletion.
- Test ideas in [Tailwind Play](https://play.tailwindcss.com/).
- Use **`@apply`** inside `.css` files to group utilities:

```css
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}
```

---

### 🧱 Example: Card Component
```html
<div class="max-w-sm bg-white border border-gray-200 rounded-xl shadow p-5">
  <img src="https://placekitten.com/300/200" class="rounded-lg mb-4" />
  <h2 class="text-xl font-semibold mb-2">Cute Cat</h2>
  <p class="text-gray-600 mb-4">Look at this adorable cat picture 😺</p>
  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Like
  </button>
</div>
```

---

### 🧰 Helpful Resources
- 🧩 [Tailwind Docs](https://tailwindcss.com/docs)
- 🎨 [Color Palette](https://tailwindcss.com/docs/customizing-colors)
- ⚡ [Playground](https://play.tailwindcss.com/)
- 💬 [VSCode Extension: Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

Made for fast development.  
No CSS files, no naming headaches — just vibes 🎸
