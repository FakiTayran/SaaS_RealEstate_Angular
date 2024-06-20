import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  companyName: string | null = '';
  companyIcon: string | null = '';
  userName: string | null = '';
  userPP: string | null = '';

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.companyName = localStorage.getItem('company_name');
    const icon = localStorage.getItem('company_icon');
    if (icon) {
      this.companyIcon = 'data:image/png;base64,' + icon; // Base64 olarak ikon verisini kullan
    }

    this.userName = localStorage.getItem('user_name');
    const userPP = localStorage.getItem('user_pp');
    if (userPP) {
      this.userPP = 'data:image/png;base64,' + userPP; // Base64 olarak kullanıcı profil resmini kullan
    }
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/button",
      icon: "disc",
      menu: "Buttons",
    },
    {
      link: "/forms",
      icon: "layout",
      menu: "Forms",
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/table",
      icon: "grid",
      menu: "Tables",
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    },
  ]

}
