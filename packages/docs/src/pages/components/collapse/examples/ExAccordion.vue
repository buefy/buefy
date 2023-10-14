<template>
    <section>

        <b-collapse
            class="card"
            animation="slide"
            v-for="(collapse, index) of collapses"
            :key="index"
            :model-value="isOpen == index"
            @open="isOpen = index"
            :aria-id="'contentIdForA11y5-' + index">
            <template #trigger="props">
                <div
                    class="card-header"
                    role="button"
                    :aria-controls="'contentIdForA11y5-' + index"
                    :aria-expanded="props.open"
                >
                    <p class="card-header-title">
                        {{ collapse.title }}
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
            </template>
            <div class="card-content">
                <div class="content">
                    {{ collapse.text }}
                </div>
            </div>
        </b-collapse>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: 0,
                collapses: [
                {
                    title: 'Title 1',
                    text: 'Text 1'
                },
                {
                    title: 'Title 2',
                    text: 'Text 2'
                },
                {
                    title: 'Title 3',
                    text: 'Text 3'
                }
                ]
            }
        }
    }
</script>
