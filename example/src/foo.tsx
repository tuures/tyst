import React from 'react'
import ReactDOM from 'react-dom'

import {clns} from '../../tyst/src/tyst' // FIXME path

import cln from './foo.styles'

// React example
interface FooProps {
  items: string[]
}
const Foo = ({items}: FooProps) => (
  <div className={cln.foo}>
    <h1 className={cln.heading}></h1>
    {items.map((item, index) =>
      <div className={clns(cln.item, index === 0 && cln.itemFirst)}>{item}</div>
    )}
  </div>
)

const items = ['foo', 'bar', 'baz']
ReactDOM.render(<Foo items={items}/>, document.body)
