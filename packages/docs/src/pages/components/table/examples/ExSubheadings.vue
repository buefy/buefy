<template>
    <section>
        <b-table
            :data="data"
            :columns="columns">
        </b-table>
    </section>
</template>

 <script>
    export default {
        data() {
            return {
                data: [
                    { 'id': 1, 'contributor': 'Jesse Simmons', 'posts': 2, 'comments': 5 },
                    { 'id': 2, 'contributor': 'John Jacobs', 'posts': 11, 'comments': 42 },
                    { 'id': 3, 'contributor': 'Tina Gilbert', 'posts': 0, 'comments': 7 },
                    { 'id': 4, 'contributor': 'Clarence Flores', 'posts': 4, 'comments': 4 },
                    { 'id': 5, 'contributor': 'Anne Lee', 'posts': 1, 'comments': 2 }
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '100',
                        numeric: true,
                        subheading: 'Total:'
                    },
                    {
                        field: 'contributor',
                        label: 'Contributor',
                    },
                    {
                        field: 'posts',
                        label: 'Posts',
                        subheading: 18
                    },
                    {
                        field: 'comments',
                        label: 'Comments',
                        subheading: 60
                    }
                ]
            }
        }
    }
</script>
