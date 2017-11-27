<template>
    <section>
        <b-field label="Limited to 10 characters">
            <b-tag-input
                maxlength="10"
                :value="['Bulma', 'Vue', 'Buefy']">
            </b-tag-input>
        </b-field>

        <b-field label="Limited to 5 tags">
            <b-tag-input
                maxtags="5"
                :value="['One', 'Two', 'Three', 'Four']">
            </b-tag-input>
        </b-field>

        <b-field label="Limited to 10 characters and 5 tags">
            <b-tag-input
                maxlength="10"
                maxtags="5"
                :value="['Red', 'Green', 'Blue', 'White']">
            </b-tag-input>
        </b-field>
    </section>
</template>
