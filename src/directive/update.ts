import { snip } from 'js-snip'
import { VueSnipDirectiveHook } from '../types'

export const update: VueSnipDirectiveHook = (el, { value }) => {
  const { lines, mode, midWord, ellipsis, onSnipped } = value
  snip(el, { lines, mode, midWord, ellipsis }, onSnipped)
}
