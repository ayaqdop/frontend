import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme'

import Auth from '../auth'

jest.mock('../../firebase', () => ({ auth: () => ({}) }))

describe.skip('<Auth />', () => {
  const wrapper = shallow(
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  )

  test('html and css', () => {
    expect(wrapper.find('main.login').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input')).toHaveLength(2)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('button.message').exists()).toBe(true)
  })

  test('data', () => {
    const inputs = wrapper.find('input')
    expect(inputs.at(0).html()).toContain('placeholder="email"')
    expect(inputs.at(1).html()).toContain('placeholder="password"')
    expect(wrapper.find('button[type="submit"]').text()).toBe('LOGIN')
    expect(wrapper.find('button.message').text()).toBe(
      'Not registered? Create an account'
    )
  })

  test.skip('state', () => {
    const state = wrapper.state()
    expect(state.authenticated).toBe(false)
    expect(state.username).toBeFalsy()
    expect(state.password).toBeFalsy()
  })
})
