<template>
    <div>
        <!-- Hero -->
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Buefy Dashboard</p>
                <p class="subtitle">One page, every Bulma layout element</p>
            </div>
        </section>

        <!-- Section + Container -->
        <section class="section">
            <div class="container">

                <!-- Level -->
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="title is-4">Projects</p>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-button type="is-primary" icon-left="plus">New project</b-button>
                        </div>
                    </div>
                </div>

                <!-- Grid: sidebar + content -->
                <div class="columns">
                    <div class="column is-one-quarter">

                        <!-- Panel -->
                        <nav class="panel">
                            <p class="panel-heading">Filters</p>
                            <div class="panel-block">
                                <b-icon class="panel-icon" icon="magnify" />
                                <input class="input" type="text" placeholder="Search projects">
                            </div>
                            <a class="panel-block is-active">
                                <b-icon class="panel-icon" icon="folder" />
                                All projects
                            </a>
                            <a class="panel-block">
                                <b-icon class="panel-icon" icon="star" />
                                Starred
                            </a>
                            <a class="panel-block">
                                <b-icon class="panel-icon" icon="archive" />
                                Archived
                            </a>
                        </nav>

                        <!-- Box + Media -->
                        <div class="box">
                            <article class="media">
                                <div class="media-left">
                                    <b-image :src="avatar" alt="Avatar" rounded ratio="1by1" style="width: 48px" />
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>Ana Silva</strong>
                                            <br>
                                            "Loving the new grid layout, ship it!"
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <!-- Card grid -->
                    <div class="column">
                        <div class="columns is-multiline">
                            <div v-for="project in projects" :key="project.name" class="column is-half">
                                <div class="card">
                                    <div class="card-image">
                                        <b-image :src="project.image" :alt="project.name" ratio="16by9" />
                                    </div>
                                    <div class="card-content">
                                        <div class="content">
                                            <p class="title is-5">{{ project.name }}</p>
                                            <p class="subtitle is-6">{{ project.status }}</p>
                                            {{ project.description }}
                                        </div>
                                    </div>
                                    <footer class="card-footer">
                                        <a class="card-footer-item">Open</a>
                                        <a class="card-footer-item">Settings</a>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Buefy</strong> layout example — Container, Hero, Section, Level, Media,
                    Grid, Box, Content, Card, Panel &amp; Footer working together.
                </p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BButton, BIcon, BImage } from "buefy";

export default defineComponent({
    components: { BButton, BIcon, BImage },
    data() {
        return {
            avatar: "https://i.pravatar.cc/96?img=47",
            projects: [
                {
                    name: "Marketing Site",
                    status: "In progress",
                    description: "Rebuilding the landing page with the new grid system.",
                    image: "https://picsum.photos/seed/buefy-layout-1/480/270",
                },
                {
                    name: "Design Tokens",
                    status: "Review",
                    description: "Syncing CSS variables between Figma and Sass.",
                    image: "https://picsum.photos/seed/buefy-layout-2/480/270",
                },
                {
                    name: "Mobile App",
                    status: "Planning",
                    description: "Scoping the layout for the companion mobile client.",
                    image: "https://picsum.photos/seed/buefy-layout-3/480/270",
                },
                {
                    name: "Internal Docs",
                    status: "Done",
                    description: "Documented every layout element with a live example.",
                    image: "https://picsum.photos/seed/buefy-layout-4/480/270",
                },
            ],
        };
    },
});
</script>
