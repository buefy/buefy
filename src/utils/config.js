const config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultSnackbarDuration: 3500,
    defaultToastDuration: 2000,
    defaultTooltipType: 'is-primary',
    defaultTooltipAnimated: false,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null
}

export default config

export const setOptions = options => { this.config = options }
