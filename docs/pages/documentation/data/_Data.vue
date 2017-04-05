<template>
    <div>
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <router-link to="table" class="nav-item is-tab">Table</router-link>
                    <router-link to="pagination" class="nav-item is-tab">Pagination</router-link>
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
