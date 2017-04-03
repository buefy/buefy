<template>
    <div class="documentation">
        <section class="hero is-medium is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Documentation</h1>
                    <h2 class="subtitle">Learn everything you need to use Buefy :)</h2>
                </div>
            </div>

            <div class="hero-foot">
                <nav class="tabs is-boxed">
                    <div class="container">
                        <ul>
                            <router-link to="/documentation/installation" tag="li"><a>Installation</a></router-link>
                            <router-link to="/documentation/notices" tag="li"><a>Notices</a></router-link>
                            <router-link to="/documentation/form-elements" tag="li"><a>Form Elements</a></router-link>
                            <router-link to="/documentation/navigation" tag="li"><a>Navigation</a></router-link>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
        <router-view></router-view>
    </div>
</template>
