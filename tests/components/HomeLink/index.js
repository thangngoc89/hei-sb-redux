import React from 'react'
import HomeLink from 'components/HomeLink'
import $ from 'teaspoon'
import { Link } from 'react-router'

const render = () => $(<HomeLink />).render()
const shallowRender = () => $(<HomeLink />).shallowRender()

describe('(Component) HomeLink', () => {
  let $root
  beforeEach(() => {
    $root = render()
  })

  afterEach(() => {
    $root.unmount()
  })

  it('Should show a link', () => {
    let $link = $root.find(Link)
    expect($link.length).to.equal(1)
  })

  it('Should have return home text', () => {
    expect($root.text()).to.equal('← return home')
  })

  it('Should link to home route', () => {
    expect($root.find(Link).props('to')).to.equal('/')
  })
})
