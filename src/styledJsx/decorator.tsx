/* eslint-disable @typescript-eslint/no-var-requires */
import { Fragment } from 'react'

let StyleRegistry: React.FC

try {
  // next >= v12
  StyleRegistry = require('styled-jsx').StyleRegistry
} catch {
  // next < v12
  StyleRegistry = Fragment
}

export const StyledJsxDecorator = (Story: React.FC): React.ReactNode => (
  <StyleRegistry>
    <Story />
  </StyleRegistry>
)
