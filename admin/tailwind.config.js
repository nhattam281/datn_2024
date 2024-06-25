/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                notfound: "url('/src/assets/not_found.jpg')",
            },
            colors: {
                logo_primary: '#1266dd',
                logo_secondary: '#f73859',
                sidebar_title: 'rgba(255, 255, 255, 0.38)',
            },
            backgroundColor: {
                primary: '#1d222b',
                secondary: '#1266dd',
                // tertiary: '#f73859',
                main: '#212631',
            },
            borderColor: {
                main: '#323a49',
            },
            fontFamily: {
                logo: 'Nosifer',
            },
        },
    },
    plugins: [],
};
