/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                notfound: "url('/src/assets/not_found.jpg')",
            },
            colors: {
                primary: '#1266dd',
                secondary: '#f73859',
            },
            backgroundColor: {
                primary: '#F5F5F5',
                secondary: '#1266dd',
                tertiary: '#f73859',
            },
        },
        fontFamily: {
            logo: 'Nosifer',
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
