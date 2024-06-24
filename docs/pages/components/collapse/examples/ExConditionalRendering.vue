<template>
    <section>

        <ul>
            <li v-for="(image, index) in images" :key="index">
                <b-collapse :open="false" class="card" animation="slide" aria-id="contentIdForA11y3">
                    <template #trigger="props">
                        <div
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3"
                            :aria-expanded="props.open">
                            <p class="card-header-title">
                                Image {{ index + 1 }}
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                    </template>
    
                    <template #content="props">
                        <div class="card-content">
                            <div>
                                <p>This content is always rendered, regardless of the collapse state.</p>
                            </div>
                            <div v-if="props.open">
                                <hr />
                                <p>This content is only rendered when the collapse is open.</p>
                                <hr />
                                <p>A network request to load this image will now only be made after the collapse is opened for the first time.</p>
                                <img :src="image" />
                            </div>
                        </div>
                    </template>
                </b-collapse>
            </li>
        </ul>

    </section>
</template>

<script>
    export default {
        data: () => ({
            images: [
                'https://placehold.co/600x400?text=Image%201',
                'https://placehold.co/600x400?text=Image%202',
                'https://placehold.co/600x400?text=Image%203',
                'https://placehold.co/600x400?text=Image%204',
                'https://placehold.co/600x400?text=Image%205'
            ]
        })
    }
</script>