<template>
    <section>
        <b-field>
            <div class="control">
                <b-switch v-model="isScrollable">Scrollable</b-switch>
            </div>
        </b-field>
        <b-field label="Max Height">
            <b-slider v-model="maxHeight" size="is-medium" :min="50" :max="250" rounded :disabled="!isScrollable">
                <template v-for="val in [100, 150, 200]">
                    <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
                </template>
            </b-slider>
        </b-field>
        
        <b-dropdown
            :scrollable="isScrollable"
            :max-height="maxHeight"
            v-model="currentMenu"
            aria-role="list"
        >
            <button class="button is-primary" type="button" slot="trigger">
                <template>
                    <b-icon :icon="currentMenu.icon"></b-icon>
                    <span>{{currentMenu.text}}</span>
                </template>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item 
                v-for="(menu, index) in menus"
                :key="index"
                :value="menu" aria-role="listitem">
                <div class="media">
                    <b-icon class="media-left" :icon="menu.icon"></b-icon>
                    <div class="media-content">
                        <h3>{{menu.text}}</h3>
                    </div>
                </div>
            </b-dropdown-item>
        </b-dropdown>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isScrollable: false,
                maxHeight: 200,
                currentMenu: { icon: 'account-group', text: 'people' },
                menus: [
                    { icon: 'account-group', text: 'people' },
                    { icon: 'shopping-search', text: 'Orders' },
                    { icon: 'credit-card-multiple', text: 'Payments' },
                    { icon: 'dolly', text: 'Logistics' },
                    { icon: 'clock-check', text: 'Jobs' },
                    { icon: 'cart-arrow-right', text: 'Cart' },
                    { icon: 'settings', text: 'Configuration' }
                ]
            }
        }
    }
</script>
