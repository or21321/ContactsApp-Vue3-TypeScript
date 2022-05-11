
import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router';
import contactPage from '../pages/contactPage.vue'
import homePage from '../pages/homePage.vue'
import contactDetails from '../components/contactDetails.vue'
import loginPage from '../pages/loginPage.vue'
import { authService } from '../services/auth.service';
// import contactEdit from '../components/contactEdit.vue'
import asyncModalWrapper from '../components/async-modal-wrapper.vue'
import { notify } from "@kyvg/vue3-notification";


const routes = [
    {
        path: '/contact',
        name: 'Contact',
        component: contactPage,
        children: [
            {
                path: 'edit/:id?',
                name: 'Edit',
                component: asyncModalWrapper
            },
            {
                path: ':id',
                name: 'Details',
                component: asyncModalWrapper
            },
        ]
    },
    {
        path: '/home',
        name: 'Home',
        component: homePage,
    },
    {
        path: '/login',
        name: 'Login',
        component: loginPage,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const isAuthenticated = authService.getLoggedUserRef()
router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated.value &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        notify({
            title: "Authorization needed",
            text: "You need to log in to see that page!",
        });
        return { name: 'Login' }
    }
})


export default router;