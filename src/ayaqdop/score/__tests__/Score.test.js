import React from 'react'
import { shallow } from 'enzyme'
import Score from '../score'

describe('<Score />', () => {
  const gameObjects = {
    teams: [
      {
        name: 'Germany',
        moves: 2,
        score: 7
      },
      {
        name: 'Brazil',
        moves: 0,
        score: 1
      }
    ]
  }
  const wrapper = shallow(<Score matchState={gameObjects} />)
  test('html and css', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.find('div')).toHaveLength(3)
    expect(wrapper.find('.moves-left').exists()).toBe(true)
    expect(wrapper.find('.moves-right').exists()).toBe(false)
  })

  test('state', () => {
    const divs = wrapper.find('div')
    expect(divs.at(0).text()).toBe('7 : 1')
    expect(divs.at(1).text()).toBe('Germany Brazil')
    expect(divs.at(2).text()).toBe('2 moves left')
  })
})
