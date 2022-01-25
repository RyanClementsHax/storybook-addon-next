import Router, { SingletonRouter as NextRouterV12 } from 'next/router'
import { SingletonRouter as NextRouterV11 } from 'nextv11/router'

export type NextRouter = NextRouterV12 | NextRouterV11

export default Router as NextRouter
