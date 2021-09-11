<template>
    <section>
        <b-field message="What do you want to search?">
            <b-input placeholder="Search..."
                type="search"
                icon="magnify">
            </b-input>
            <p class="control">
                <b-button type="is-primary" label="Search" />
            </p>
        </b-field>

        <b-field message="What a beautiful email!!">
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
                <b-button type="is-success" label="Transfer" />
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <b-button icon-left="format-bold" />
            </p>
            <p class="control">
                <b-button icon-left="format-italic" />
            </p>
            <p class="control">
                <b-button icon-left="format-underline" />
            </p>
            <p class="control">
                <b-button icon-left="format-align-left" />
            </p>
            <p class="control">
                <b-button icon-left="format-align-center" />
            </p>
            <p class="control">
                <b-button icon-left="format-align-right" />
            </p>
            <b-input 
                placeholder="Search..." 
                type="search" 
                icon="magnify"></b-input>
        </b-field>

        <b-field>
            <p class="control">
                <b-button label="Button" type="is-primary" />
            </p>
            <p class="control">
                <b-dropdown>
                    <template #trigger>
                        <b-button type="is-primary" icon-left="menu-down" />
                    </template>

                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else</b-dropdown-item>
                </b-dropdown>
            </p>
        </b-field>

        <b-field>
            <p class="control">
                <b-dropdown>
                    <template #trigger>
                        <b-button label="Filters" icon-right="menu-down" />
                    </template>

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
