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
          textLightBoth: '#DFE3FA',
          textWhite: '#FFFFFF',
          invoiceBG: '#1E2139',
          inputBG: '#252945',
          inputFont: '#DFE3FA',
          filterBG: '#252945'
        },
        light: {
          background: '#F8F8FB',
          menuBackground: '#1E2139',
          lightPuprleFont: '#DFE3FA',
          buttonBackground: '#7C5DFA',
          secondary: '#DDDDDD',
          textLightBoth: '#888EB0',
          textBlack: '#0C0E16',
          invoiceBG: '#FFFFFF',
          whiteBackground: '#FFFFFF',
          inputBG: '#F9FAFE',
          inputFont: '#7E88C3',
          filterBG: '#FFFFFF'
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
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
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
