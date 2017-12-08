<template>
    <section>
        <template v-for="component in data">
            <h3 v-if="component.title" class="subtitle" :key="component.title">
                {{ component.title }}
            </h3>
            <b-tabs :key="component.title">
                <b-tab-item v-if="component.props" label="Properties">
                    <b-table :data="component.props" default-sort="name">
                        <template slot-scope="props">
                            <b-table-column label="Name">
                                <span v-html="props.row.name" style="white-space: nowrap"/>
                            </b-table-column>
                            <b-table-column label="Description">
                                <span v-html="props.row.description"/>
                            </b-table-column>
                            <b-table-column label="Type">
                                <span>{{ props.row.type }}</span>
                            </b-table-column>
                            <b-table-column label="Values">
                                <span v-html="props.row.values"/>
                            </b-table-column>
                            <b-table-column label="Default">
                                <span v-html="props.row.default"/>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>

                <b-tab-item v-if="component.slots" label="Slots">
                    <b-table :data="component.slots" default-sort="name">
                        <template slot-scope="props">
                            <b-table-column label="Slot name">
                                <span v-html="props.row.name" style="white-space: nowrap"/>
                            </b-table-column>
                            <b-table-column label="Description">
                                <span v-html="props.row.description"/>
                            </b-table-column>
                            <b-table-column label="Props (if scoped)">
                                <span v-html="props.row.props"/>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>

                <b-tab-item v-if="component.events" label="Events">
                    <b-table :data="component.events" default-sort="name">
                        <template slot-scope="props">
                            <b-table-column label="Name">
                                <span v-html="props.row.name" style="white-space: nowrap"/>
                            </b-table-column>
                            <b-table-column label="Description">
                                <span v-html="props.row.description"/>
                            </b-table-column>
                            <b-table-column label="Parameters">
                                <span v-html="props.row.parameters"/>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>

                <b-tab-item v-if="component.methods" label="Methods">
                    <b-table :data="component.methods" default-sort="name">
                        <template slot-scope="props">
                            <b-table-column label="Name">
                                <span v-html="props.row.name" style="white-space: nowrap"/>
                            </b-table-column>
                            <b-table-column label="Description">
                                <span v-html="props.row.description"/>
                            </b-table-column>
                            <b-table-column label="Return">
                                <span v-html="props.row.return"/>
                            </b-table-column>
                        </template>
                    </b-table>
                </b-tab-item>
            </b-tabs>
        </template>
    </section>
</template>

<script>
    export default {
        props: {
            data: Array
        }
    }
</script>
