/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
      colors: {
        dark: {
          background: '#141625',
          menuBackground: '#1E2139',
          lightPuprleFont: '#7E88C3',
          buttonBackground: '#7C5DFA',
          secondary: '#666666',
          // Dodaj więcej kolorów ciemnych według potrzeb
        },
        light: {
          background: '#F8F8FB',
          menuBackground: '#1E2139',
          lightPuprleFont: '#7E88C3',
          buttonBackground: '#7C5DFA',
          secondary: '#DDDDDD',
          // Dodaj więcej kolorów jasnych według potrzeb
        },
      },
    },

	},
	plugins: [],
};
