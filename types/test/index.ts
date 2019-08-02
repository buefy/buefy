import { Dialog, LoadingProgrammatic, ModalProgrammatic, Snackbar, Toast, BuefyConfig } from "../index";
import Buefy from "../index";
import Vue from "vue";

Vue.use(Buefy);

const app = new Vue();

const loader = app.$buefy.loading.open({});
loader.close();

app.$buefy.dialog.alert("Testing Buefy Typescript Typings");
app.$buefy.dialog.alert({
    message: "Testing this works",
    onConfirm: (value) => {
        console.log("confirm");
    }
});

app.$buefy.dialog.prompt({
    message: "Message",
    title: "Dialog Title",
    onCancel: () => {
        console.log("Canceled");
    },
    onConfirm: (value) => {
        console.log(value);
    },
    inputAttrs: {
        maxlength: 5
    }
})

app.$buefy.toast.open({
    message: "Ok",
    type: 'is-primary',
    position: 'is-top'
});

app.$buefy.toast.open("I like this");

app.$buefy.toast.open({
    message: 'Something happened correctly!',
    type: 'is-success'
});

app.$buefy.toast.open({
    duration: 5000,
    message: `Something's not good, also I'm on bottom`,
    position: 'is-bottom',
    type: 'is-danger'
})

app.$buefy.snackbar.open("Snackbar");

app.$buefy.snackbar.open({
    message: 'Yellow button and positioned top-left',
    type: 'is-warning',
    position: 'is-top-left',
    actionText: 'Retry',
    onAction: () => {
        app.$buefy.toast.open('Action pressed')
    }
});

app.$buefy.snackbar.open({
    duration: 5000,
    message: 'Snackbar with red action, positioned on bottom-left and a callback',
    type: 'is-danger',
    position: 'is-bottom-left',
    actionText: 'Undo',
    onAction: () => {
        app.$buefy.toast.open('Action pressed')
    }
});

app.$buefy.modal.open({
    parent: app
});
