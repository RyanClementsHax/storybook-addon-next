import { RouterDecorator } from './decorators/Router'
import './stubs/next-image-stub'
import { StyleRegistry } from 'styled-jsx'
import React from 'react'

export const decorators = [
  (Story: React.FC): React.ReactNode => (
    <StyleRegistry>
      <Story />
    </StyleRegistry>
  ),
  RouterDecorator
]
