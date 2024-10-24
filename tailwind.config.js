module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // Default padding for all breakpoints
          // sm: '1rem', // Padding for the sm breakpoint
          // md: '1rem', // Padding for the md breakpoint
          // lg: '0', // Padding for the lg breakpoint
          // xl: '0', // Padding for the xl breakpoint
          // '2xl': '0', // Padding for the 2xl breakpoint
        },
        screens: {
          sm: '100%', // Override for sm breakpoint
          md: '768px', // Override for md breakpoint
          lg: '1024px', // Override for lg breakpoint
          xl: '1024px', // Override for xl breakpoint
          '2xl': '1024px', // Override for 2xl breakpoint
        },
      },
    },
  },
  plugins: [],
};
