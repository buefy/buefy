import config, { type IconAliases, type IconAlias } from './config'

// Checkmark and indeterminate paths use viewBox "0 0 1 1" (extracted from _functions.scss).
// All other paths use viewBox "0 0 24 24" (MDI standard).

const defaultIconAliases: IconAliases = {
    checkboxOn: {
        type: 'svg',
        viewBox: '0 0 1 1',
        path: 'M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'
    },
    checkboxIndeterminate: {
        type: 'svg',
        viewBox: '0 0 1 1',
        path: 'M 0.15,0.4 L 0.85,0.4 L 0.85,0.6 L 0.15,0.6 Z'
    },
    chevronLeft: {
        type: 'svg',
        path: 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z'
    },
    chevronRight: {
        type: 'svg',
        path: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
    },
    chevronDown: {
        type: 'svg',
        path: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'
    },
    chevronUp: {
        type: 'svg',
        path: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z'
    },
    menuDown: {
        type: 'svg',
        path: 'M7,10L12,15L17,10H7Z'
    },
    menuUp: {
        type: 'svg',
        path: 'M7,14L12,9L17,14H7Z'
    },
    check: {
        type: 'svg',
        path: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'
    },
    alertCircle: {
        type: 'svg',
        path: 'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
    },
    alert: {
        type: 'svg',
        path: 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z'
    },
    information: {
        type: 'svg',
        path: 'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
    },
    close: {
        type: 'svg',
        path: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
    },
    closeCircle: {
        type: 'svg',
        path: 'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z'
    },
    eye: {
        type: 'svg',
        path: 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
    },
    eyeOff: {
        type: 'svg',
        path: 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.18 16.38,18.6L16.81,19L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z'
    }
}

export function getIconAliases(): IconAliases {
    if (config.iconAliases) {
        return { ...defaultIconAliases, ...config.iconAliases } as IconAliases
    }
    return defaultIconAliases
}

export function resolveAlias(name: string): IconAlias | undefined {
    return getIconAliases()[name]
}

export default defaultIconAliases
