<template>
    <div>
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <router-link to="icon" class="nav-item is-tab">Icon</router-link>
                    <router-link to="tooltip" class="nav-item is-tab">Tooltip</router-link>
                </div>
            </div>
        </nav>

        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
