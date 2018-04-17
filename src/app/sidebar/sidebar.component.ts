import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt', class: '' },
    // { path: 'user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
    // { path: 'table', title: 'Table List', icon: 'pe-7s-note2', class: '' },
    // { path: 'typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
    // { path: 'icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
    // { path: 'maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
    // { path: 'notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' },
    //{ path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

export const TestRoutes: RouteInfo[] = [
    { path: 'register', title: 'Register', icon: 'fas fa-user-plus', class: '' },
    { path: 'userslist', title: 'Users List', icon: 'fas fa-address-card', class: '' },
    { path: 'inspectionReg', title: 'inspection Registration', icon: 'fas fa-edit', class: '' }
]

export const TeamLeadRoutes: RouteInfo[] = [
    { path: 'Scheduler', title: 'Scheduler', icon: 'far fa-calendar-alt', class: '' },
    { path: 'observations', title: 'observations', icon: 'fas fa-clipboard-list', class: '' }
]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    listItems: any[];
    teamleadItems:any[];
    Role
    constructor() { }

    ngOnInit() {
        this.Role = JSON.parse(window.localStorage.getItem('Role'));
        console.log('localstorage Role Id',this.Role)
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.listItems = TestRoutes.filter(listItem => listItem);
        this.teamleadItems = TeamLeadRoutes.filter(AuthRoute => AuthRoute);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
