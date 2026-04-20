import type {MClickEffect} from '../../utils/useInteractionEffect'

export type MMediaInteractionEffect = MClickEffect | 'zoom' | 'dim' | 'zoom-ripple'
export type MMediaHoverEffect = 'none' | 'zoom' | 'dim' | 'zoom-dim'

export function usesRipple(effect: MMediaInteractionEffect): boolean {
    return effect === 'ripple' || effect === 'zoom-ripple'
}

export function usesZoom(effect: MMediaInteractionEffect): boolean {
    return effect === 'zoom' || effect === 'zoom-ripple'
}

export function usesDim(effect: MMediaInteractionEffect): boolean {
    return effect === 'dim'
}

export function usesHoverZoom(effect: MMediaHoverEffect): boolean {
    return effect === 'zoom' || effect === 'zoom-dim'
}

export function usesHoverDim(effect: MMediaHoverEffect): boolean {
    return effect === 'dim' || effect === 'zoom-dim'
}
