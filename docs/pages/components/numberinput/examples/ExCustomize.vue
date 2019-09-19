<template>
    <section>
        <b-field>
            <b-numberinput></b-numberinput>
        </b-field>
        <b-field label="Rounded controls">
            <b-numberinput controls-rounded></b-numberinput>
        </b-field>

        <b-field label="Compact">
            <b-numberinput controls-position="compact"></b-numberinput>
        </b-field>

        <b-field label="Compact and rounded controls">
            <b-numberinput controls-position="compact"
                controls-rounded>
            </b-numberinput>
        </b-field>

        <b-field label="Grouped">
            <b-field grouped>
                <p class="control">
                    <button class="button">Button</button>
                </p>
                <b-numberinput/>
            </b-field>
        </b-field>

        <b-field label="Grouped and expanded">
            <b-field grouped>
                <p class="control">
                    <button class="button">Button</button>
                </p>
                <b-numberinput expanded/>
            </b-field>
        </b-field>

        <b-field label="With Addons">
            <b-field>
                <p class="control">
                    <button class="button">Button</button>
                </p>
                <b-numberinput controlsPosition="compact"/>
            </b-field>
        </b-field>

        <b-field label="With Addons and expanded">
            <b-field>
                <p class="control">
                    <button class="button">Button</button>
                </p>
                <b-numberinput expanded controlsPosition="compact"/>
            </b-field>
        </b-field>
    </section>
</template>
