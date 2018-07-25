import { Component, OnInit, ElementRef, Input, Output } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DataService } from '../../../../../services/Shared/data.service';
import { RouterModule, Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
   // @Output() sidebarVisible: boolean
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    name

    constructor(location: Location, private element: ElementRef, private router: Router, private dataServie: DataService) {
        this.location = location;
        this.sidebarVisible = false;
        this.dataServie.currentMsg.subscribe(msg => {
            const toggleButton = this.toggleButton;
            this.sidebarVisible  = msg
           
            if (msg) {
                this.sidebarVisible  = !msg
                setTimeout(function () {
                    toggleButton.classList.remove('toggled');
                }, 200);
            }

        })
    }
    
    ngOnInit() {
        this.name = JSON.parse(window.localStorage.getItem('name'))
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 200);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.split('/').pop();
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    logOut() {
        window.localStorage.clear()
    }
}
