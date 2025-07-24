<template>
    <section>
        <b-field label="Select time">
            <b-clockpicker
                ref="clockpicker"
                rounded
                placeholder="Click to select..."
                icon="clock"
                @update:model-value="onInput"
            />
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BClockpicker, BField } from "buefy";

export default defineComponent({
    components: {
        BClockpicker,
        BField
    },
    data() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            clockpicker: null as any
        };
    },
    methods: {
        onInput() {
            if (!this.clockpicker) return;
            if (!this.clockpicker.isSelectingHour) {
                this.attachMouseupListener();
            }
        },
        attachMouseupListener() {
            document.addEventListener("mouseup", this.onMouseUp, { once: true });
        },
        async onMouseUp() {
            await this.delay(50);
            const isDragging = this.clockpicker?.$refs?.clockpickerFace?.isDragging;
            if (!isDragging && !this.clockpicker.isSelectingHour) {
                this.clockpicker.close();
                await this.delay(150);
                this.clockpicker.isSelectingHour = true;
            }
        },
        delay(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    mounted() {
        this.clockpicker = this.$refs.clockpicker;
    },
    beforeUnmount() {
        document.removeEventListener("mouseup", this.onMouseUp);
    }
});
</script>
