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
        },
        light: {
          background: '#F8F8FB',
          menuBackground: '#1E2139',
          lightPuprleFont: '#7E88C3',
          buttonBackground: '#7C5DFA',
          secondary: '#DDDDDD',
        },
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '8/10': '80%',
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '8/10': '80%',
        '6/10': '60%',
      },
      borderWidth: {
        '1': '1px',
      }
    },

	},
	plugins: [],
};
