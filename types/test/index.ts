import { Dialog, LoadingProgrammatic, ModalProgrammatic, Snackbar, Toast, BuefyConfig } from "../index";
import Buefy from "../index";
import Vue from "vue";

Vue.use(Buefy);

const app = new Vue();

const loader = app.$loading.open();
loader.close();

app.$dialog.alert("Testing Buefy Typescript Typings");
app.$dialog.alert({
    message: "Testing this works",
    onConfirm: (value) => {
        console.log("confirm");
    }
});

app.$dialog.prompt({
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

app.$toast.open({
    message: "Ok",
    type: 'is-primary',
    position: 'is-top'
});

app.$toast.open("I like this");

app.$toast.open({
    message: 'Something happened correctly!',
    type: 'is-success'
});

app.$toast.open({
    duration: 5000,
    message: `Something's not good, also I'm on bottom`,
    position: 'is-bottom',
    type: 'is-danger'
})

app.$snackbar.open("Snackbar");

app.$snackbar.open({
    message: 'Yellow button and positioned top-left',
    type: 'is-warning',
    position: 'is-top-left',
    actionText: 'Retry',
    onAction: () => {
        app.$toast.open('Action pressed')
    }
});

app.$snackbar.open({
    duration: 5000,
    message: 'Snackbar with red action, positioned on bottom-left and a callback',
    type: 'is-danger',
    position: 'is-bottom-left',
    actionText: 'Undo',
    onAction: () => {
        app.$toast.open('Action pressed')
    }
});

app.$modal.open({
    parent: app
});
