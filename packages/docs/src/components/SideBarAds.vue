<template>
    <div
        id="carbon-cover"
        class="carbon-ad-container"
        ref="adContainer"
    />
</template>

<script>
export default {
    name: 'CarbonAd',
    mounted() {
        const script = document.createElement('script')
        script.async = true
        script.type = 'text/javascript'
        script.src = '//cdn.carbonads.com/carbon.js?serve=CWYITK77&placement=buefyorg'
        script.id = '_carbonads_js'
        this.$refs.adContainer.appendChild(script)
    }
}
</script>

<style lang="scss">
#carbonads * {
    margin: initial;
    padding: initial;
    line-height: initial;
}

#carbonads {
    --carbon-font-family: -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
        'Helvetica Neue', Helvetica, Arial, sans-serif;
    --carbon-font-size: 14px;
    --carbon-padding: 1.5ch;
    --carbon-max-char: 20ch;
}

#carbonads {
    z-index: 10;
    font-size: var(--carbon-font-size);
    font-family: var(--carbon-font-family);
}

#carbonads > span {
    display: flex;
    flex-direction: column;
    min-inline-size: 130px;
    max-inline-size: calc(
        130px + var(--carbon-max-char) + 8ch
    );
    padding: var(--carbon-padding);
    gap: var(--carbon-padding);
    background-color: var(--bulma-primary);
    box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.085),
        0 0 2px hsl(0deg 0% 0% / 0.085),
        0 0 4px hsl(0deg 0% 0% / 0.085),
        0 0 8px hsl(0deg 0% 0% / 0.085);
}

#carbonads a {
    color: var(--bulma-light);
    text-decoration: none;
}

#carbonads a:hover {
    color: var(--bulma-light);
    background-color: var(--bulma-accent)
}

#carbonads .carbon-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5ex;
}

#carbonads .carbon-img {
    flex: 0 0 130px;
}

#carbonads .carbon-img img {
    display: block;
}

#carbonads .carbon-text {
    flex-grow: 1;
    flex-basis: var(--carbon-max-char);
    line-height: 1.4;
    text-align: left;
}

#carbonads .carbon-poweredby {
    padding: 6px 8px;
    background: var(--bulma-secondary);
    color: var(--bulma-light);
    font-weight: 600;
    font-size: 0.6em;
    line-height: 1.4;
    letter-spacing: 0.2ch;
    text-align: center;
    text-transform: uppercase;
}
</style>
