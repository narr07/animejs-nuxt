import { createTimeline, type TimelineParams } from 'animejs'

export const useTimeline = (params?: TimelineParams) => createTimeline(params)
