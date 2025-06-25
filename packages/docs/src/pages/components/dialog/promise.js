const { result, dialog } = await this.$buefy.dialog.confirm({
    message: 'Are you sure?',
    closeOnConfirm: false
});
