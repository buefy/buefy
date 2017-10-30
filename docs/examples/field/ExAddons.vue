<template>
    <section>
        <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon="search">
            </b-input>
            <p class="control">
                <button class="button is-primary">Search</button>
            </p>
        </b-field>

        <b-field>
            <b-input placeholder="This is expanded" expanded></b-input>
            <p class="control">
                <span class="button is-static">@gmail.com</span>
            </p>
        </b-field>

        <hr>

        <b-field>
            <b-select placeholder="Currency">
                <option>$</option>
                <option>£</option>
                <option>€</option>
            </b-select>
            <b-input type="number" placeholder="0,00"></b-input>
            <p class="control">
                <button class="button is-success">Transfer</button>
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_bold"></b-icon>
                </button>
            </p>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_italic"></b-icon>
                </button>
            </p>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_underlined"></b-icon>
                </button>
            </p>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_align_left"></b-icon>
                </button>
            </p>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_align_center"></b-icon>
                </button>
            </p>
            <p class="control">
                <button class="button">
                    <b-icon icon="format_align_right"></b-icon>
                </button>
            </p>
            <b-input placeholder="Search..." type="search" icon="search"></b-input>
        </b-field>

        <b-field>
            <p class="control">
                <button class="button is-primary">
                    Button
                </button>
            </p>
            <p class="control">
                <b-dropdown>
                    <button class="button is-primary" slot="trigger">
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else</b-dropdown-item>
                </b-dropdown>
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <b-dropdown>
                    <button class="button" slot="trigger">
                        <span>Filters</span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                    </button>

                    <b-dropdown-item value="open_issues">Open Issues and Pull Requests</b-dropdown-item>
                    <b-dropdown-item value="your_issues">Your Issues</b-dropdown-item>
                    <b-dropdown-item value="pull_requests">Your Pull Requests</b-dropdown-item>
                    <b-dropdown-item value="everything">Everything</b-dropdown-item>
                </b-dropdown>
            </p>
            <b-input icon="search" type="search" placeholder="Search..."></b-input>
        </b-field>
    </section>
</template>
