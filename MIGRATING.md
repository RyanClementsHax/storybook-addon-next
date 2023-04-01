# Migrating

## To Storybook v7

You should be able to migrate directly to Storybook v7 and its frameworks api for Nextjs. `@storybook/nextjs` is designed to be a drop in replacement for this addon. Below are some helpful links for you to perform this migration.

- [Nextjs migration docs](https://storybook.js.org/recipes/next)
- [Integrate Next.js and Storybook automatically](https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/)
- [Storybook migration docs](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-65x-to-700)
- [Storybook upgrade docs](https://storybook.js.org/docs/7.0/react/configure/upgrading)

It is strongly recommended to use their auto migration scripts performed when running `npx storybook@next upgrade --prerelease` or more directly `npx storybook@next automigrate`. This should automate migration from this addon directly to `@storybook/nextjs` while also migrating you to Storybook v7.

Supporting Storybook v7 for this addon is currently in development. See [this issue](https://github.com/RyanClementsHax/storybook-addon-next/issues/186) for more details.
