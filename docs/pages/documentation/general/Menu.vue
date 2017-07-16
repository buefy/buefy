<template>
    <div class="container">
        <h1 class="title is-spaced">Menu</h1>
        <h2 class="subtitle">
            A simple menu, for any type of vertical navigation
        </h2>
        <hr>

        <div class="columns">
            <div class="column is-3">
                <b-menu>
                    <b-menu-list label="General">
                        <b-menu-item>Dashboard</b-menu-item>
                        <b-menu-item>Customer</b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="Administration">
                        <b-menu-item>Team Settings</b-menu-item>
                        <b-menu-dropdown>
                            <template slot="trigger">Manage Your Team</template>
                            <b-menu-item>Members</b-menu-item>
                            <b-menu-item>Plugins</b-menu-item>
                            <b-menu-item>Add a member</b-menu-item>
                        </b-menu-dropdown>
                        <b-menu-item>Invitations</b-menu-item>
                        <b-menu-item>Cloud Storage Environment Settings</b-menu-item>
                        <b-menu-item>Authentication</b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="Transactions">
                        <b-menu-item>Payments</b-menu-item>
                        <b-menu-item>Transfers</b-menu-item>
                        <b-menu-item>Balance</b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Support multi-level menu</h2>
        <div class="columns">
            <div class="column is-3">
                <b-menu>
                    <b-menu-list>
                        <b-menu-dropdown>
                            <template slot="trigger">Level 1</template>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                        </b-menu-dropdown>
                        <b-menu-dropdown>
                            <template slot="trigger">Level 1</template>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                        </b-menu-dropdown>
                    </b-menu-list>
                </b-menu>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h3 class="subtitle">Menu</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="menuProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="menuEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters">
                            <span v-html="props.row.parameters"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h3 class="subtitle">Menu List</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="menuListProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h3 class="subtitle">Menu Dropdown</h3>
        <b-tabs>
            <b-tab-item label="Slots">
                <b-table :data="menuDropdownSlots" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
            <b-tab-item label="Events">
                <b-table :data="menuDropdownEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters">
                            <span v-html="props.row.parameters"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h3 class="subtitle">Menu Item</h3>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="menuItemProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
            <b-tab-item label="Events">
                <b-table :data="menuItemEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters">
                            <span v-html="props.row.parameters"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding active menu item value',
                        type: 'Any',
                        values: '—',
                        default: '<code>null</code>'
                    },
                    {
                        name: '<code>auto-close</code>',
                        description: 'Auto collapse unrelated dropdowns',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>animated</code>',
                        description: 'Animate dropdown toggle',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>router</code>',
                        description: `Set it true when using a custom anchor tag or <code>router-link</code>.
                            It will handle correct menu active state if toggle <code>is-active</code> class on the custom element.`,
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                menuEvents: [
                    {
                        name: '<code>change</code>',
                        description: 'Trigger when selected item is changed',
                        parameters: '<code>value: String</code>'
                    }
                ],
                menuListProps: [
                    {
                        name: '<code>label</code>',
                        description: 'Label of Menu List',
                        type: 'Any',
                        values: '—',
                        default: '—'
                    }
                ],
                menuDropdownSlots: [
                    {
                        name: '<code>trigger</code>',
                        description: 'Toggling dropdown element',
                    }
                ],
                menuDropdownEvents: [
                    {
                        name: '<code>toggle</code>',
                        description: 'Trigger when dropdown is toggled',
                        parameters: '<code>isActive: Boolean</code>'
                    }
                ],
                menuItemProps: [
                    {
                        name: '<code>value</code>',
                        description: 'The value that will be returned on events and v-model',
                        type: 'Any',
                        values: '—',
                        default: '<code>null</code>'
                    }
                ],
                menuItemEvents: [
                    {
                        name: '<code>click</code>',
                        description: 'Trigger when menu item is clicked',
                        parameters: '<code>value: Any</code>'
                    }
                ],
                template1: `
                <b-menu>
                    <b-menu-list label="General">
                        <b-menu-item>Dashboard</b-menu-item>
                        <b-menu-item>Customer</b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="Administration">
                        <b-menu-item>Team Settings</b-menu-item>
                        <b-menu-dropdown>
                            <template slot="trigger">Manage Your Team</template>
                            <b-menu-item>Members</b-menu-item>
                            <b-menu-item>Plugins</b-menu-item>
                            <b-menu-item>Add a member</b-menu-item>
                        </b-menu-dropdown>
                        <b-menu-item>Invitations</b-menu-item>
                        <b-menu-item>Cloud Storage Environment Settings</b-menu-item>
                        <b-menu-item>Authentication</b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="Transactions">
                        <b-menu-item>Payments</b-menu-item>
                        <b-menu-item>Transfers</b-menu-item>
                        <b-menu-item>Balance</b-menu-item>
                    </b-menu-list>
                </b-menu>`,
                template2: `
                <b-menu>
                    <b-menu-list>
                        <b-menu-dropdown>
                            <template slot="trigger">Level 1</template>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                        </b-menu-dropdown>
                        <b-menu-dropdown>
                            <template slot="trigger">Level 1</template>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                            <b-menu-dropdown>
                                <template slot="trigger">Level 2</template>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                                <b-menu-dropdown>
                                    <template slot="trigger">Level 3</template>
                                    <b-menu-item>Level 4</b-menu-item>
                                    <b-menu-item>Level 4</b-menu-item>
                                </b-menu-dropdown>
                            </b-menu-dropdown>
                        </b-menu-dropdown>
                    </b-menu-list>
                </b-menu>`
            }
        }
    }
</script>

