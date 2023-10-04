<template>
    <section>
        <div class="content">
            <h3>
                Subtitle
            </h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
        </div>
        <b-collapse 
            :model-value="false"
            position="is-bottom" 
            aria-id="contentIdForA11y4">
            <template #trigger="props">
                <a
                    aria-controls="contentIdForA11y4"
                    :aria-expanded="props.open">
                    <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                    {{ !props.open ? 'All options' : 'Fewer options' }}
                </a>
            </template>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
        </b-collapse>
    </section>
</template>

<style scoped>
    .content {
        margin-bottom: 0 !important;
    }
</style>
