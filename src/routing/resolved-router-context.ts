// this file will be aliased by webpack at runtime (this is just for typing)

import { RouterContext as RouterContextV12 } from 'next/dist/shared/lib/router-context'
import { RouterContext as RouterContextV11 } from 'nextv11/dist/next-server/lib/router-context'
import { RouterContext as RouterContextV10 } from 'nextv10/dist/next-server/lib/router-context'

export const RouterContext:
  | typeof RouterContextV12
  | typeof RouterContextV11
  | typeof RouterContextV10 = RouterContextV12
