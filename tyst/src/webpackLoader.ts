import * as babel from '@babel/core'
import stripMarkerBabelPlugin from './stripMarkerBabelPlugin'
import requireFromString from 'require-from-string'
import { loader } from 'webpack'
import loaderUtils from 'loader-utils'

export default function(this: loader.LoaderContext, content: string/*, sourceMap?: loader.RawSourceMap, meta: any*/) {
  const callback = this.async()
  if (!callback) {
    throw new Error("could not get callback")
  }

  const options = loaderUtils.getOptions(this);

  const babelOptions = {
    // filename: this.resourcePath,
    plugins: [stripMarkerBabelPlugin],
    presets: [
      [require('@babel/preset-env'), { targets: { node: true } }]
    ]
  }

  babel.transform(content, babelOptions, (babelErr, babelResult) => {
    if (babelErr !== null) {
      console.error(babelErr)
      this.emitError(babelErr)
    }

    const transformedContent = babelResult!.code as string // FIXME

    const contentModule = requireFromString(transformedContent, this.resourcePath)
    console.log(contentModule)
    const ast = contentModule.default

    if(!ast) {
      this.emitError(`Expected default export to contain tyst css rules but got: ${JSON.stringify(ast)}`)
    }

    const astToCss = (ast: any) => Object.entries(ast).reduce((acc, [key, value]) =>
    `${acc}\n.${key}{\n${value}}\n`, //FIXME
    ''
    )

    const cssContent = astToCss(ast)
    console.log(cssContent)

    let resultValue: any = [[this.resourcePath, cssContent]]
    resultValue.locals = Object.keys(ast).reduce((acc, key) => ({...acc, [key]: key}), {})

    const resultContent = `module.exports = ${JSON.stringify(resultValue)}`

    callback(null, resultContent/*, map, meta*/)
  })
}
