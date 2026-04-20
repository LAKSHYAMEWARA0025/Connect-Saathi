/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'federal-blue': 'var(--federal-blue)',
        'marian-blue': 'var(--marian-blue)',
        'honolulu-blue': 'var(--honolulu-blue)',
        'blue-green': 'var(--blue-green)',
        'pacific-cyan': 'var(--pacific-cyan)',
        'vivid-sky-blue': 'var(--vivid-sky-blue)',
        'non-photo-blue': 'var(--non-photo-blue)',
        'non-photo-blue-2': 'var(--non-photo-blue-2)',
        'light-cyan': 'var(--light-cyan)',
      }
    }
  },
  plugins: [],
}
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "federal-blue": "#03045e",
//         "marian-blue": "#023e8a",
//         "honolulu-blue": "#0077b6",
//         "blue-green": "#0096c7",
//         "pacific-cyan": "#00b4d8",
//         "vivid-sky-blue": "#48cae4",
//         "non-photo-blue": "#90e0ef",
//         "non-photo-blue-2": "#ade8f4",
//         "light-cyan": "#caf0f8",
//         purple: {
//           light: "#d0bfff",
//           DEFAULT: "#9d4edd",
//           dark: "#5a189a",
//         },
//       },
//     },
//   },
//   plugins: [],
// };