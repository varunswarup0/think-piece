import React from 'react'
import Particles from 'react-particles-js'

export default ({ children }) => (
  <>
    <Particles
      params={{
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 1000
            }
          }
        }
      }}
    />
    {children}
  </>
)
