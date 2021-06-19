<template>
    <section>

        <b-collapse :model-value="false" aria-id="contentIdForA11y1">
            <template #trigger="props">
                <b-button
                    label="Click me!"
                    type="is-primary"
                    aria-controls="contentIdForA11y1"
                    :aria-expanded="props.open" />
            </template>
            <div class="notification">
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
            </div>
        </b-collapse>

    </section>
</template>
