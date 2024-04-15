<template>
    <section>
        <b-field>
            <b-numberinput 
                step="5"
                aria-minus-label="Decrement by 5"
                aria-plus-label="Increment by 5">
            </b-numberinput>
        </b-field>

        <b-field label="Decimal">
            <b-numberinput 
                step="0.01"
                aria-minus-label="Decrement by 0.01"
                aria-plus-label="Increment by 0.01">
            </b-numberinput>
        </b-field>

        <b-field label="Minimum step">
            <b-numberinput 
                step="0.2"
                min-step="0.01"
                aria-minus-label="Decrement by 0.2"
                aria-plus-label="Increment by 0.2">
            </b-numberinput>
        </b-field>
    </section>
</template>
