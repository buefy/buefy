<template>
    <section>
        <b-field label="Limited to 10 characters">
            <b-taginput
                maxlength="10"
                :modelValue="['Bulma', 'Vue', 'Buefy']">
            </b-taginput>
        </b-field>

        <b-field label="Limited to 5 tags">
            <b-taginput
                maxtags="5"
                :modelValue="['One', 'Two', 'Three', 'Four']">
            </b-taginput>
        </b-field>

        <b-field label="Limited to 10 characters and 5 tags">
            <b-taginput
                maxlength="10"
                maxtags="5"
                :modelValue="['Red', 'Green', 'Blue', 'White']">
            </b-taginput>
        </b-field>
    </section>
</template>
