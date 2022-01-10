import { RouterContext } from 'next/dist/shared/lib/router-context'
import './next-image-stub'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  }
}
