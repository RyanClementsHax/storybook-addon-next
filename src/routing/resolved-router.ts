// this file will be aliased by webpack at runtime (this is just for typing)

import Router, { SingletonRouter as NextRouterV12 } from 'next/router'
import { SingletonRouter as NextRouterV11 } from 'nextv11/router'
import { SingletonRouter as NextRouterV10 } from 'nextv10/router'
import { SingletonRouter as NextRouterV9 } from 'nextv9/router'

export type NextRouter =
  | NextRouterV12
  | NextRouterV11
  | NextRouterV10
  | NextRouterV9

export default Router as NextRouter
