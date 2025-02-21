/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                heroBg: "#080030",
                pera: "#ffffff",
                h1: "#afa99e",
                h2: "#b34bfe",
                nav: "#b7fffe",
                herobg2: '#1D0B50'
            },
            fontFamily: {
                heading: ["Radio Canada Big", "serif"],
                primary: ["Inter", "serif"],
            },
        },
    },
    plugins: [],
};
