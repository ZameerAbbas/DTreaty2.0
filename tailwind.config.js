// tailwind.config.js
const nativewind = require("nativewind/tailwind/css");
module.exports = {
  content: ["./App.{js,ts,jsx,tsx}",'./Components/**/*.{js,jsx,ts,tsx}'],
  plugins: [nativewind()],
};
