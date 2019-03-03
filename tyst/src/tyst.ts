export interface Properties {
  color?: string
  fontSize?: number
}

type Rules<N> = { [className in keyof N]: Properties }
type ClassNames<N> = { [className in keyof N]: string }

export const css = <N>(rules: Rules<N>): ClassNames<N> => {
  throw new Error("css() call is intended to be evaluated build time")
}

export const clns = (...classNames: Array<string | false | null | undefined>) => classNames.filter(Boolean).join(' ')
