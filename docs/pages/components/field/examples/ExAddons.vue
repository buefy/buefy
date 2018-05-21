<template>
    <section>
        <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon="magnify">
            </b-input>
            <p class="control">
                <b-button text="Search" btn="is-primary" />
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
                <b-button text="Transfer" btn="is-success" />
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <b-button icon="format-bold" />
            </p>
            <p class="control">
                <b-button icon="format-italic" />
            </p>
            <p class="control">
                <b-button icon="format-underline" />
            </p>
            <p class="control">
                <b-button icon="format-align-left" />
            </p>
            <p class="control">
                <b-button icon="format-align-center" />
            </p>
            <p class="control">
                <b-button icon="format-align-right" />
            </p>
            <b-input placeholder="Search..." type="search" icon="magnify"></b-input>
        </b-field>

        <b-field>
            <p class="control">
                <b-button text="Button" btn="is-primary" />
            </p>
            <p class="control">
                <b-dropdown>
                    <b-button icon="menu-down" btn="is-primary" slot="trigger" />

                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else</b-dropdown-item>
                </b-dropdown>
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <b-dropdown>
                    <b-button text="Filters" icon="menu-down" slot="trigger" />

                    <b-dropdown-item value="open_issues">Open Issues and Pull Requests</b-dropdown-item>
                    <b-dropdown-item value="your_issues">Your Issues</b-dropdown-item>
                    <b-dropdown-item value="pull_requests">Your Pull Requests</b-dropdown-item>
                    <b-dropdown-item value="everything">Everything</b-dropdown-item>
                </b-dropdown>
            </p>
            <b-input icon="magnify" type="search" placeholder="Search..."></b-input>
        </b-field>
    </section>
</template>
