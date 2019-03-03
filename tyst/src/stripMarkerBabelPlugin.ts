import { Visitor } from '@babel/traverse'
import * as t from '@babel/types'

const nameToLookFor = 'css'

/*
 * This transformation just removes the css() call (which is there only to aid code completion)
 * and leaves the bare rules exported.
 * That way the loader can then import the rules for further processing.
 */

export default function() {
  return {
    visitor: {
      CallExpression(callPath) {
        const callee = callPath.node.callee
        const isCssCall =
          t.isIdentifier(callee) &&
          callee.name == nameToLookFor
        if (!isCssCall) {
          return
        }

        // the following two check are just for added safety / fail-fast, in theory they could be removed
        // and the loader could just check that default export of the processed file is a good-looking value
        if (!t.isExportDefaultDeclaration(callPath.parent)) {
          throw callPath.buildCodeFrameError(`Expected ${nameToLookFor}() to be default exported`)
        }

        const args = callPath.node.arguments
        const argIsObjectLiteral = args.length === 1 &&
          t.isObjectExpression(args[0])
        if (!argIsObjectLiteral) {
          throw callPath.buildCodeFrameError(`Expected ${nameToLookFor}() to have object literal as argument`)
        }

        callPath.replaceWith(args[0])
      }
    } as Visitor
  };
}
