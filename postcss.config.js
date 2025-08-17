export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: false,
            minifySelectors: true,
            minifyParams: true,
            minifyGradients: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true,
            discardEmpty: true,
            discardOverridden: true,
            mergeLonghand: true,
            mergeRules: true,
          },
        ],
      },
    }),
  },
};
