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
      link: "/addEstate",
      icon: "plus",
      menu: "Add New Estate",
    },
    {
      link: "/estateList",
      icon: "list",
      menu: "Estate List",
    },
    {
      link: "/addAgent",
      icon: "plus",
      menu: "Add Estate Agent",
    },
    {
      link: "/agentList",
      icon: "list",
      menu: "Estate Agent List",
    },
    
  ]

}
