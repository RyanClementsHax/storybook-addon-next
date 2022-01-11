import { RouterContext } from 'next/dist/shared/lib/router-context'
import './next-image-stub'

console.log('HELLOOOOOOOOOOOOO')

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  }
}
