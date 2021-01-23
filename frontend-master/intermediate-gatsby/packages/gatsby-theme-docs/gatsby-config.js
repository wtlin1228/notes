const withDefaults = require('./utils/default-options');

module.exports = (options) => {
  const { contentPath, useExternalMSX } = withDefaults(options);

  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'gatsby-theme-docs',
          path: contentPath,
        },
      },
      !useExternalMSX && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/Layout.js'),
          },
        },
      },
    ].filter(Boolean),
  };
};
