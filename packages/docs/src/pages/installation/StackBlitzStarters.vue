<template>
    <div>
        <div class="content">
            <p>
                Start from a ready-to-run Buefy setup in StackBlitz. Pick the stack
                you want, open it in one click, and begin building immediately.
            </p>
        </div>

        <div class="columns is-multiline">
            <div
                v-for="example in starterExamples"
                :key="example.id"
                class="column is-12-mobile is-6-tablet is-4-desktop"
            >
                <div class="card starter-card">
                    <div class="card-content">
                        <p class="title is-4">{{ example.title }}</p>
                        <p class="subtitle is-6">{{ example.subtitle }}</p>
                        <p class="content">{{ example.description }}</p>

                        <ul class="example-points">
                            <li v-for="point in example.points" :key="point">
                                {{ point }}
                            </li>
                        </ul>
                    </div>

                    <footer class="card-footer">
                        <a
                            class="card-footer-item"
                            href="#"
                            @click.prevent="openStarter(example.id)"
                        >
                            Open in StackBlitz
                        </a>
                    </footer>
                </div>
            </div>
        </div>

        <b-message type="is-info" class="mt-5">
            <div class="content">
                <p>
                    Each example includes Buefy + Bulma, plus the minimum setup for
                    its framework.
                </p>
                <p>
                    You can fork the project in StackBlitz to save your own version.
                </p>
            </div>
        </b-message>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BMessage } from 'buefy'
import sdk from '@stackblitz/sdk'

import {
    createStarterProject,
    starterExamples,
    type StarterId,
} from './usage/stackblitz-starters'

export default defineComponent({
    components: {
        BMessage,
    },
    data() {
        return {
            starterExamples,
        };
    },
    methods: {
        openStarter(id: StarterId) {
            const project = createStarterProject(id)
            sdk.openProject(project, {
                openFile: project.openFile,
                newWindow: true,
            })
        },
    },
})
</script>

<style scoped>
.starter-card {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.starter-card .card-content {
    flex: 1;
}

.example-points {
    margin: 0;
    padding-left: 1.25rem;
}
</style>