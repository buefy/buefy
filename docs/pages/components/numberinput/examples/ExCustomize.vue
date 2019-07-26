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

        <b-field label="Label inside" label-position="inside">
            <b-numberinput></b-numberinput>
        </b-field>
        <b-field label="Label on border" label-position="on-border">
            <b-numberinput></b-numberinput>
        </b-field>
        <b-field label="Compact with Label inside" label-position="inside">
            <b-numberinput controls-position="compact"></b-numberinput>
        </b-field>
        <b-field label="Compact with Label on border" label-position="on-border">
            <b-numberinput controls-position="compact"></b-numberinput>
        </b-field>
    </section>
</template>
