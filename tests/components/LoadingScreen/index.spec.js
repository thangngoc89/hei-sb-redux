import React from 'react'
import LoadingScreen from 'components/LoadingScreen'
import $ from 'teaspoon'
import styles from 'components/LoadingScreen/style.css'

const renderWithProps = () => $(<LoadingScreen />).render()
const shallowRenderWithProps = () => $(<LoadingScreen />).shallowRender()

const selector = (style) => `.${style}`
describe('(Components) LoadingScreen', () => {
  let $root, _props, div

  beforeEach(() => {
    $root = renderWithProps()
  })

  afterEach(() => {
    $root.unmount()
  })

  it('Should render as an div', () => {
    shallowRenderWithProps().is('div')
  })

  it('Should have loading text', () => {
    expect($root.text()).to.match(/^loading/)
  })

  it('Should have a div with loading-screen class', () => {
    div = $root.find(selector(styles['loading-screen']))
    expect(div.length).to.equal(1)
  })

  it('Should have a div with loading-animation class', () => {
    div = $root.find(selector(styles['loading-animation']))
    expect(div.length).to.equal(1)
  })
  it('Should have a div with bounce-1 class', () => {
    div = $root.find(selector(styles['bounce-1']))
    expect(div.length).to.equal(1)
  })
  it('Should have a div with bounce-2 class', () => {
    div = $root.find(selector(styles['bounce-2']))
    expect(div.length).to.equal(1)
  })
})
