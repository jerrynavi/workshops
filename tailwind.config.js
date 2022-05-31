module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Livvic', 'sans'],
    },
    extend: {
      colors: {
        primary: '#FFCE25',
        'light-blue': '#00AAE4',
        blue: '#0097CC',
        dark: '#0D0D0D',
        red: '#FF392E',
        'lighter-gray': '#F2F2F2',
        'light-gray': '#7F7F7F',
        'darker-gray': '#1D1D1B',
        yellow: '#FFC80C',
      },
      fontSize: {
        sm: ['14.4px', '18px'],
        base: ['18px', '27px'],
        h1: ['60px', '72px'],
        'h1-mobile': ['36px', '43px'],
        h2: ['40px', '50px'],
        'h2-mobile': ['32px', '40px'],
        h3: ['29px', '36px'],
        'h3-mobile': ['20.3px', '25px'],
        h4: ['27px', '34px'],
        'h4-mobile': ['18.9px', '24px'],
        h5: ['23px', '29px'],
        'h5-mobile': ['18.4px', '23px'],
        h6: ['15px', '19px'],
        'h6-mobile': ['13.5px', '17px'],
      },
      boxShadow: {
        DEFAULT: '1px 2px 8px 0px rgba(127, 127, 127, 0.25)',
        lg: '1px 2px 16px rgba(127, 127, 127, 0.25)',
        'inverse-lg': '-1px -2px 16px rgba(127, 127, 127, 0.25)',
      },
      dropShadow: {
        DEFAULT: '-1px -2px 4px 0px rgba(127, 127, 127, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
