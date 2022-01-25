import { RouterContext as RouterContextV12 } from 'next/dist/shared/lib/router-context'
import { RouterContext as RouterContextV11 } from 'nextv11/dist/next-server/lib/router-context'

export const RouterContext: typeof RouterContextV12 | typeof RouterContextV11 =
  RouterContextV12
