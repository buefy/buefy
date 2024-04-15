<template>
    <section>
        <b-field label="Rounded controls">
            <b-numberinput controls-rounded></b-numberinput>
        </b-field>

        <b-field label="Compact and rounded controls">
            <b-numberinput controls-position="compact" controls-rounded></b-numberinput>
        </b-field>

        <b-field label="Compact, rounded and right aligned controls">
            <b-numberinput 
                controls-alignment="right"
                controls-position="compact"
                controls-rounded></b-numberinput>
        </b-field>

        <b-field label="Grouped">
            <b-field grouped>
                <p class="control">
                    <b-button label="Button" />
                </p>
                <b-numberinput/>
            </b-field>
        </b-field>

        <b-field label="Grouped and expanded">
            <b-field grouped>
                <p class="control">
                    <b-button label="Button" />
                </p>
                <b-numberinput expanded/>
            </b-field>
        </b-field>

        <b-field label="With addons">
            <b-field>
                <p class="control">
                    <b-button label="Button" />
                </p>
                <b-numberinput controls-position="compact"/>
            </b-field>
        </b-field>

        <b-field label="With addons and expanded">
            <b-field>
                <p class="control">
                    <b-button label="Button" />
                </p>
                <b-numberinput expanded controls-position="compact"/>
            </b-field>
        </b-field>


        <b-field label="With addons, expanded and right aligned controls">
            <b-field>
                <p class="control">
                    <b-button label="Button" />
                </p>
                <b-numberinput expanded controls-position="compact" controls-alignment="right" />
            </b-field>
        </b-field>
    </section>
</template>
