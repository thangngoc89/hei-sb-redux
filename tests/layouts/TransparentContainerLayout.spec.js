import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Grid, Col, Row } from 'react-bootstrap'
import Container from 'layouts/TransparentContainerLayout'
import $ from 'teaspoon'

const renderWithProps = (props = {}) => $(<Container {...props} />).render()
const shallowRenderWithProps = (props = {}) => $(<Container {...props} />).shallowRender()

describe('(Layout) TransparentContainerLayout', () => {
  let $root, _props, _children

  beforeEach(() => {
    _children = (<div>This is a children</div>)
    _props = {
      xs: 12,
      sm: 10,
      md: 8,
      lg: 6,
      colClassName: 'foo-class',
      children: _children
    }
    $root = renderWithProps(_props)
  })

  afterEach(() => {
    $root.unmount()
  })

  it('Should render Grid fluid by default', () => {
    const grid = $root.find($.s(Grid, '[fluid]'))
    expect(grid.length).to.equal(1)
  })

  it('Should render Grid --no-fluid when specify', () => {
    $root = renderWithProps({
      ..._props,
      fluid: false
    })
    const grid = $root.find($.s(Grid, '[fluid]'))
    expect(grid.length).to.equal(0)
  })

  it('Should render a Row', () => {
    const row = $root.find('Row')
    expect(row.length).to.equal(1)
  })

  it('Should render passed Col sizes', () => {
    const col = $root.find($.s(Col, '[xs=12][sm=10][md=8][lg=6]'))
    expect(col.length).to.equal(1)
  })

  it('Should render component outside container', () => {
    $root = renderWithProps({
      ..._props,
      outside: <div className='outside'></div>
    })
    const div = $root.find('div.outside')
    expect(div.length).to.equal(1)
  })

  it('Should render a Col with center-block class', () => {
    const col = $root.find($.s(Col, '.center-block'))
    expect(col.length).to.equal(1)
  })

  it('Should render a div with container-transparent class', () => {
    const div = $root.find('div.container-transparent')
    expect(div.length).to.equal(1)
  })

  it('Should render a div with custom class', () => {
    const div = $root.find('div.foo-class')
    expect(div.length).to.equal(1)
  })
})
