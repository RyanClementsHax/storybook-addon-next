import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router, { NextRouter } from 'next/router'
import { action } from '@storybook/addon-actions'
import { StoryContext } from '@storybook/addons'

export const RouterDecorator = (
  Story: React.FC,
  context: StoryContext
): React.ReactNode => {
  const nextRouterParams = context.parameters.nextRouter ?? {}

  Router.router = {
    locale: context?.globals?.locale,
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push(...args: unknown[]) {
      action('nextRouter.push')(...args)
      return Promise.resolve(true)
    },
    replace(...args: unknown[]) {
      action('nextRouter.replace')(...args)
      return Promise.resolve(true)
    },
    reload(...args: unknown[]) {
      action('nextRouter.reload')(...args)
    },
    back(...args: unknown[]) {
      action('nextRouter.back')(...args)
    },
    prefetch(...args: unknown[]) {
      action('nextRouter.prefetch')(...args)
      return Promise.resolve()
    },
    beforePopState(...args: unknown[]) {
      action('nextRouter.beforePopState')(...args)
    },
    events: {
      on(...args: unknown[]) {
        action('nextRouter.events.on')(...args)
      },
      off(...args: unknown[]) {
        action('nextRouter.events.off')(...args)
      },
      emit(...args: unknown[]) {
        action('nextRouter.events.emit')(...args)
      }
    },
    isFallback: false,
    ...nextRouterParams
  } as typeof Router.router

  return (
    <RouterContext.Provider value={Router.router as NextRouter}>
      <Story />
    </RouterContext.Provider>
  )
}
