import React, { useEffect, useRef } from 'react'
 // eslint-disable-next-line 
const isFunction = (value: unknown): value is Function => typeof value === 'function'
const isString = (value: unknown): value is string => typeof value === 'string'
const isNumber = (value: unknown): value is number => typeof value === 'number'
export type TKeyEvent = 'keydown' | 'keyup'
export type TEventHandler = (event: KeyboardEvent) => void
export type TOptions = {
  events?: TKeyEvent[]
  target?: HTMLElement | Window
  exactMatch?: boolean
}
export type KeyPredicate = (event: KeyboardEvent) => boolean
export type keyType = number | string

export type KeyFilter = keyType | keyType[] | ((event: KeyboardEvent) => boolean)
// 键盘事件 keyCode 别名
const aliasKeyCodeMap = {
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222,
}

function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
// 修饰键
const modifierKey = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,

  
}
// 根据 event 计算激活键数量
const countKeyByEvent = (event: KeyboardEvent) => {
  const countOfModifier = Object.keys(modifierKey).reduce((total, key) => {
    if (modifierKey[key](event)) {
      return total + 1
    }

    return total
  }, 0)
  return [16, 17, 18, 91, 92].includes(event.keyCode) ? countOfModifier : countOfModifier + 1
}
const genFilterKey = (event: KeyboardEvent, keyFilter: keyType, exactMatch: boolean) => {
  // 浏览器自动补全 input 的时候，会触发 keyDown、keyUp 事件，但此时 event.key 等为空
  if (!event.key) {
    return false
  }
  if (isNumber(keyFilter)) {
    return event.keyCode === keyFilter
  }
  //字符串依次判断是否有组合键
  let genLen = 0
  const genArr = keyFilter.split('.')
  for (const key of genArr) {
    // 组合键
    const genModifier = modifierKey[key]
    // keyCode 别名
    const aliasKeyCode = aliasKeyCodeMap[key.toLowerCase()]
    if ((genModifier && genModifier(event)) || (aliasKeyCode && aliasKeyCode === event.keyCode)) {
      genLen++
    }
  }
  if (exactMatch) {
    return genLen === genArr.length && countKeyByEvent(event) === genArr.length
  }
  return genLen === genArr.length
}
const genKeyFormatter = (keyFilter: KeyFilter, exactMatch: boolean): KeyPredicate => {
  if (isFunction(keyFilter)) {
    return keyFilter
  }
  if (isNumber(keyFilter) || isString(keyFilter)) {
    return (event: KeyboardEvent) => genFilterKey(event, keyFilter, exactMatch)
  }
  if (Array.isArray(keyFilter)) {
    return (event: KeyboardEvent) => keyFilter.some(item => genFilterKey(event, item, exactMatch))
  }
  return keyFilter ? () => true : () => false
}
const defaultEvent = ['keydown']
const useKeyPress = (keyFilter: KeyFilter, eventHandler: TEventHandler, options?: TOptions) => {
  const { target = window, events = defaultEvent, exactMatch = false } = options || {}
  const keyFilterRef = useLatest(keyFilter)
  const eventHandlerRef = useLatest(eventHandler)

  useEffect(() => {
    const callbackHandler = (event: any) => {
      const genGuard: KeyPredicate = genKeyFormatter(keyFilterRef.current, exactMatch)
      if (genGuard(event)) {
        return eventHandlerRef.current?.(event)
      }
    }
    for (const eventName of events) {
      target.addEventListener(eventName, callbackHandler)
    }
    return () => {
      for (const eventName of events) {
        target?.removeEventListener?.(eventName, callbackHandler)
      }
    }
  }, [])
}

export default useKeyPress
