import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

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

export const LocationRoutes: RouteInfo[] = [
    { path: 'country', title: 'Country', icon: '', class: '' },
    { path: 'state', title: 'State', icon: '', class: '' },
    { path: 'district', title: 'District', icon: '', class: '' }
]

export const TeamLeadRoutes: RouteInfo[] = [
    { path: 'Scheduler', title: 'Scheduler', icon: 'far fa-calendar-alt', class: '' },
    { path: 'observations', title: 'observations', icon: 'fas fa-clipboard-list', class: '' }
]

export const PSIRoutes: RouteInfo[] = [
    { path: 'assignments', title: 'My Assignments', icon: 'fas fa-briefcase', class: '' },
]
export const GrowerRoutes: RouteInfo[] = [
    { path: 'registrations', title: 'My Registrations', icon: 'fas fa-book', class: '' },
]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    constructor(private dataServie:DataService){

    }
    menuItems: any[];
    listItems: any[];
    locationItems: any[];
    teamleadItems: any[];
    psiItems: any[];
    growerItems: any[];
    Role
   
    message;

    ngOnInit() {
        // this.dataServie.currentMsg.subscribe(msg => 
        //     this.message = msg
        // )
        this.Role = JSON.parse(window.localStorage.getItem('Role'));
        //console.log('localstorage Role Id', this.Role)
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.listItems = TestRoutes.filter(listItem => listItem);
        this.locationItems = LocationRoutes.filter(LocationRoute => LocationRoute);
        this.teamleadItems = TeamLeadRoutes.filter(AuthRoute => AuthRoute);
        this.psiItems = PSIRoutes.filter(authRoute => authRoute);
        this.growerItems = GrowerRoutes.filter(authRoute => authRoute);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    logOut() {
        //console.log('logOut')
        this.dataServie.changeMessage(true)
        window.localStorage.clear()
        //this.router.navigate([app])
        this.sidebarClose();
    }
    private sidebarVisible: boolean;
    private toggleButton: any;


    hideSideMenu(){
        this.dataServie.changeMessage(true)
        //console.log('hideSideMenu')
        this.sidebarClose();
       
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        //this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = true;
        body.classList.remove('nav-open');
    };

}
