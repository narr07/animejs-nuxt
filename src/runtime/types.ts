/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/runtime/types.ts - Complete Anime.js v4 Types

export interface AnimeJS {
  // Core Animation
  animate: (targets: any, params?: AnimationParams) => Animation

  // Timeline
  createTimeline: (params?: TimelineParams) => Timeline

  // Stagger
  stagger: (value: number | [number, number], options?: StaggerOptions) => StaggerFunction

  // Scope
  createScope: (params?: ScopeParams) => Scope

  // Scroll
  onScroll: (targets: any, params?: ScrollParams) => ScrollObserver

  // Draggable
  createDraggable: (targets: any, params?: DraggableParams) => Draggable

  // Text
  text: TextHelpers

  // SVG
  svg: SVGHelpers

  // Utils
  utils: Utils

  // Timer
  createTimer: (params?: TimerParams) => Timer

  // Engine
  engine: Engine

  // Animatable
  animatable: (targets: any, params?: AnimatableParams) => Animatable
}

// ===== ANIMATION TYPES =====
export interface AnimationParams {
  // Targets
  targets?: any

  // Tween Parameters
  duration?: number | ((el: any, i: number, total: number) => number)
  delay?: number | string | StaggerFunction | ((el: any, i: number, total: number) => number)
  ease?: string | ((t: number) => number)
  from?: number | string | ((el: any, i: number, total: number) => number | string)
  to?: number | string | ((el: any, i: number, total: number) => number | string)
  modifier?: (value: any) => any
  composition?: 'none' | 'replace' | 'blend'

  // Animatable Properties
  x?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  y?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  z?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  scale?: number | number[] | ((el: any, i: number, total: number) => number)
  scaleX?: number | number[] | ((el: any, i: number, total: number) => number)
  scaleY?: number | number[] | ((el: any, i: number, total: number) => number)
  scaleZ?: number | number[] | ((el: any, i: number, total: number) => number)
  rotate?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  rotateX?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  rotateY?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  rotateZ?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  skew?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  skewX?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  skewY?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  translateX?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  translateY?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)
  translateZ?: number | string | number[] | string[] | ((el: any, i: number, total: number) => number | string)

  // CSS Properties
  opacity?: number | number[] | ((el: any, i: number, total: number) => number)
  backgroundColor?: string | string[] | ((el: any, i: number, total: number) => string)
  color?: string | string[] | ((el: any, i: number, total: number) => string)
  width?: number | string | (number | string)[] | ((el: any, i: number, total: number) => number | string)
  height?: number | string | (number | string)[] | ((el: any, i: number, total: number) => number | string)

  // Playback Settings
  autoplay?: boolean
  loop?: boolean | number
  alternate?: boolean
  reversed?: boolean
  framerate?: number
  playbackRate?: number
  playbackEase?: string
  playbackLoopDelay?: number

  // Callbacks
  onBegin?: (animation: Animation) => void
  onUpdate?: (animation: Animation) => void
  onComplete?: (animation: Animation) => void
  onLoop?: (animation: Animation) => void
  onPause?: (animation: Animation) => void
  onRender?: (animation: Animation) => void
  onBeforeUpdate?: (animation: Animation) => void
  then?: (callback?: Function) => Promise<any>

  // Keyframes
  keyframes?: AnimationParams[]

  // Individual Property Parameters
  [key: string]: any
}

export interface Animation {
  // Control Methods
  play: () => Animation
  pause: () => Animation
  restart: () => Animation
  reverse: () => Animation
  cancel: () => Animation
  revert: () => Animation
  resume: () => Animation
  complete: () => Animation
  seek: (time: number) => Animation
  stretch: (factor: number) => Animation
  alternate: () => Animation
  refresh: () => Animation

  // Properties
  duration: number
  currentTime: number
  progress: number
  reversed: boolean
  began: boolean
  paused: boolean
  completed: boolean
  finished: Promise<void>

  // Promise Support
  then: (callback?: Function) => Promise<any>
}

// ===== TIMELINE TYPES =====
export interface TimelineParams {
  // Playback Settings
  loop?: boolean | number
  alternate?: boolean
  autoplay?: boolean
  reversed?: boolean
  delay?: number
  framerate?: number
  playbackRate?: number
  playbackEase?: string
  playbackLoopDelay?: number
  defaults?: AnimationParams

  // Callbacks
  onBegin?: (timeline: Timeline) => void
  onUpdate?: (timeline: Timeline) => void
  onComplete?: (timeline: Timeline) => void
  onLoop?: (timeline: Timeline) => void
  onPause?: (timeline: Timeline) => void
  onRender?: (timeline: Timeline) => void
  onBeforeUpdate?: (timeline: Timeline) => void
}

export interface Timeline extends Animation {
  // Timeline Methods
  add: (targets: any, params?: AnimationParams, position?: number | string) => Timeline
  set: (targets: any, params: AnimationParams, position?: number | string) => Timeline
  call: (callback: Function, position?: number | string) => Timeline
  label: (name: string, position?: number | string) => Timeline
  remove: (targets: any) => Timeline
  sync: (timeline: Timeline) => Timeline
  init: () => Timeline

  // Properties
  children: Animation[]
}

// ===== STAGGER TYPES =====
export interface StaggerOptions {
  from?: 'first' | 'last' | 'center' | number | [number, number]
  ease?: string | ((t: number) => number)
  grid?: [number, number]
  axis?: 'x' | 'y'
  start?: number
  reversed?: boolean
  total?: number
  modifier?: (value: number) => number
  use?: 'delay' | 'duration' | any
}

export type StaggerFunction = (el: any, index: number, total: number) => number | string

// ===== SCOPE TYPES =====
export interface ScopeParams {
  root?: Element | string
  defaults?: AnimationParams
  mediaQueries?: { [key: string]: AnimationParams }
}

export interface Scope {
  animate: (targets: any, params?: AnimationParams) => Animation
  add: (targets: any, params?: AnimationParams) => Scope
  addOnce: (targets: any, params?: AnimationParams) => Scope
  revert: (targets?: any) => Scope
  refresh: () => Scope
  keepTime: (value: boolean) => Scope

  // Properties
  root: Element
  defaults: AnimationParams
}

// ===== SCROLL TYPES =====
export interface ScrollParams {
  // Settings
  container?: Element | string
  axis?: 'x' | 'y'
  target?: Element | string
  repeat?: boolean
  debug?: boolean

  // Thresholds
  enter?: number | string
  leave?: number | string

  // Callbacks
  onEnter?: (observer: ScrollObserver) => void
  onLeave?: (observer: ScrollObserver) => void
  onEnterForward?: (observer: ScrollObserver) => void
  onEnterBackward?: (observer: ScrollObserver) => void
  onLeaveForward?: (observer: ScrollObserver) => void
  onLeaveBackward?: (observer: ScrollObserver) => void
  onUpdate?: (observer: ScrollObserver) => void
  onSyncComplete?: (observer: ScrollObserver) => void

  // Synchronisation
  sync?: 'smooth' | 'eased' | 'progress'
}

export interface ScrollObserver {
  // Methods
  revert: () => ScrollObserver
  refresh: () => ScrollObserver
  link: (animation: Animation) => ScrollObserver

  // Properties
  progress: number
  isInView: boolean
  container: Element
  target: Element
}

// ===== DRAGGABLE TYPES =====
export interface DraggableParams {
  // Settings
  container?: Element | string
  trigger?: Element | string
  cursor?: string

  // Physics
  dragSpeed?: number
  releaseEase?: string
  releaseMass?: number
  releaseStiffness?: number
  releaseDamping?: number
  containerFriction?: number
  releaseContainerFriction?: number
  containerPadding?: number

  // Velocity
  minVelocity?: number
  maxVelocity?: number
  velocityMultiplier?: number

  // Scroll
  scrollSpeed?: number
  scrollThreshold?: number

  // Axes
  x?: DraggableAxisParams
  y?: DraggableAxisParams

  // Callbacks
  onGrab?: (draggable: Draggable) => void
  onDrag?: (draggable: Draggable) => void
  onRelease?: (draggable: Draggable) => void
  onSettle?: (draggable: Draggable) => void
  onSnap?: (draggable: Draggable) => void
  onUpdate?: (draggable: Draggable) => void
  onResize?: (draggable: Draggable) => void
  onAfterResize?: (draggable: Draggable) => void
}

export interface DraggableAxisParams {
  snap?: number | number[] | ((value: number) => number)
  mapTo?: (value: number) => number
  modifier?: (value: number) => number
}

export interface Draggable {
  // Methods
  enable: () => Draggable
  disable: () => Draggable
  revert: () => Draggable
  refresh: () => Draggable
  reset: () => Draggable
  stop: () => Draggable
  setX: (value: number) => Draggable
  setY: (value: number) => Draggable
  animateInView: () => Draggable
  scrollInView: () => Draggable

  // Properties
  x: number
  y: number
  isDragging: boolean
  isEnabled: boolean
}

// ===== TEXT TYPES =====
export interface TextSplitParams {
  type?: 'chars' | 'words' | 'lines'
  linesClass?: string
  wordsClass?: string
  charsClass?: string
  tagName?: string
  reduceWhiteSpace?: boolean
}

export interface TextHelpers {
  split: (targets: any, params?: TextSplitParams) => TextSplitter
}

export interface TextSplitter {
  // Methods
  revert: () => TextSplitter
  refresh: () => TextSplitter

  // Properties
  chars: Element[]
  words: Element[]
  lines: Element[]
  original: string
}

// ===== SVG TYPES =====
export interface SVGHelpers {
  createMotionPath: (path: string | SVGPathElement, params?: MotionPathParams) => MotionPath
  morphTo: (target: string | SVGElement, params?: MorphParams) => MorphAnimation
  createDrawable: (target: string | SVGElement, params?: DrawableParams) => Drawable
}

export interface MotionPathParams {
  precision?: number
  rotate?: boolean
}

export interface MotionPath {
  x: (progress: number) => number
  y: (progress: number) => number
  angle: (progress: number) => number
  length: number
}

export interface MorphParams {
  duration?: number
  ease?: string
}

export interface MorphAnimation extends Animation {
  // Morph-specific properties
}

export interface DrawableParams {
  duration?: number
  ease?: string
}

export interface Drawable {
  draw: (progress: number) => void
  length: number
}

// ===== UTILS TYPES =====
export interface Utils {
  // DOM Utils
  get: (targets: any, property: string) => any
  set: (targets: any, property: string, value: any) => void
  remove: (targets: any, property: string) => void
  cleanInlineStyles: (targets: any) => void

  // Math Utils
  random: (min?: number, max?: number) => number
  randomPick: <T>(array: T[]) => T
  lerp: (start: number, end: number, progress: number) => number
  clamp: (value: number, min: number, max: number) => number
  round: (value: number, precision?: number) => number
  roundPad: (value: number, precision: number) => string
  snap: (value: number, increment: number) => number
  wrap: (value: number, min: number, max: number) => number
  mapRange: (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => number
  interpolate: (start: any, end: any, progress: number) => any

  // String Utils
  padStart: (str: string, length: number, char?: string) => string
  padEnd: (str: string, length: number, char?: string) => string
  shuffle: <T>(array: T[]) => T[]

  // Conversion Utils
  degToRad: (degrees: number) => number
  radToDeg: (radians: number) => number

  // Advanced Utils
  sync: (callback: Function) => void
  createTimekeeper: (params?: TimekeeperParams) => Timekeeper
  $: (selector: string) => Element | Element[]
}

export interface TimekeeperParams {
  duration?: number
  ease?: string
}

export interface Timekeeper {
  time: number
  progress: number
  play: () => Timekeeper
  pause: () => Timekeeper
  restart: () => Timekeeper
}

// ===== TIMER TYPES =====
export interface TimerParams {
  duration?: number
  delay?: number
  loop?: boolean | number
  alternate?: boolean
  autoplay?: boolean
  reversed?: boolean
  framerate?: number
  playbackRate?: number
  playbackLoopDelay?: number

  // Callbacks
  onBegin?: (timer: Timer) => void
  onUpdate?: (timer: Timer) => void
  onComplete?: (timer: Timer) => void
  onLoop?: (timer: Timer) => void
  onPause?: (timer: Timer) => void
  then?: (callback?: Function) => Promise<any>
}

export interface Timer {
  // Control Methods
  play: () => Timer
  pause: () => Timer
  restart: () => Timer
  reverse: () => Timer
  cancel: () => Timer
  revert: () => Timer
  resume: () => Timer
  complete: () => Timer
  seek: (time: number) => Timer
  stretch: (factor: number) => Timer
  alternate: () => Timer

  // Properties
  duration: number
  currentTime: number
  progress: number
  reversed: boolean
  began: boolean
  paused: boolean
  completed: boolean

  // Promise Support
  then: (callback?: Function) => Promise<any>
}

// ===== ENGINE TYPES =====
export interface Engine {
  // Methods
  update: () => void
  pause: () => void
  resume: () => void

  // Parameters
  fps: number
  precision: number
  timeUnit: 'ms' | 's'
  pauseOnDocumentHidden: boolean
  speed: number

  // Properties
  isRunning: boolean
  currentTime: number
}

// ===== ANIMATABLE TYPES =====
export interface AnimatableParams {
  duration?: number
  ease?: string
  unit?: string
  modifier?: (value: any) => any
}

export interface Animatable {
  // Methods
  revert: () => Animatable

  // Getters/Setters
  get: (property: string) => any
  set: (property: string, value: any) => Animatable

  // Properties
  target: any
  duration: number
  ease: string
}

// ===== WEB ANIMATION API TYPES =====
export interface WAAPIParams {
  convertEase?: boolean
  hardwareAcceleration?: boolean
}

export interface WAAPIAnimation extends Animation {
  // WAAPI-specific properties and methods
  effect: KeyframeEffect
  timeline: AnimationTimeline
  playState: AnimationPlayState
}

// ===== NUXT PLUGIN TYPES =====
declare module '#app' {
  interface NuxtApp {
    $anime: AnimeJS
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $anime: AnimeJS
  }
}
