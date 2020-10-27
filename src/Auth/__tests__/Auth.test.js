import React from 'react'
import { shallow } from 'enzyme'
import Auth from '../Auth'

describe('<Auth />', () => {
  const wrapper = shallow(<Auth />)

  test('html and css', () => {
    expect(wrapper.find('main.login').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input')).toHaveLength(2)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('p.message').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  test('data', () => {
    const inputs = wrapper.find('input')
    expect(inputs.at(0).html()).toContain('placeholder="username"')
    expect(inputs.at(1).html()).toContain('placeholder="password"')
    expect(wrapper.find('button').text()).toBe('login')
    expect(wrapper.find('p').text()).toBe('Not registered? Create an account')
  })

  test('state', () => {
    const state = wrapper.state()
    expect(state.authenticated).toBe(false)
    expect(state.username).toBeFalsy()
    expect(state.password).toBeFalsy()
  })
})
