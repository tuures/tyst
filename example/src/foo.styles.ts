import {css} from '../../tyst/dist/tyst' // FIXME path

import {colors} from './colors.styles'
/*

General requirements:

- tyst needs to be able to parse the source files, so if they have some syntax node.js
does not yet understand, you need to have Babel configured (.babelrc) so that when tyst
uses Babel it can parse your files.

*/

/* the CSS is extracted and the css() function call replaced with object literal that
contains generated class names */
export default css({
  heading: {
    color: colors.cherryRed
  },
  item: {
    // thisShouldBeError: 'asd',
    fontSize: 14,
    borderBotton: '1px solid #000',
  },
  itemFirst: {
    borderTop: '1px solid #000',
  }
})
