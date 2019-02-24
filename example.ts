import {css, clns} from './tyst'

/*

General requirements:

- tyst needs to be able to parse the source files, so if they have some syntax node.js
does not yet understand, you need to have Babel configured (.babelrc) so that when tyst
uses Babel it can parse your files.

*/

/* the CSS is extracted and the css() function call replaced with object literal that
contains generated class names */
const cln = css({
  heading: {
    color: '#888'
  },
  content: {
    // thisShouldBeError: 'asd',
    fontSize: 14,
  }
})

// combine multiple css classes
const fooClassNames = clns(cln.heading, cln.content)
