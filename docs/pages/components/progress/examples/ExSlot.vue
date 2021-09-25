<template>
    <section>
        <b-progress 
            :value="75" 
            size="is-medium" 
            show-value
        >
            Custom display with <span style="color: red">HTML</span>
        </b-progress>
        <b-progress 
            :value="75" 
            size="is-medium" 
            show-value
        >
            75 / 100
        </b-progress>
        <b-progress 
            :value="75" 
            size="is-medium" 
            show-value
        >
            3 out of 4
        </b-progress>
    </section>
</template>
