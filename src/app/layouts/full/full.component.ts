import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  search: boolean = false;
  public authUser$: Observable<User | null>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

  routerActive: string = 'activelink';

  sidebarMenu: sidebarMenu[] = [
    {
      link: '/home',
      icon: 'home',
      menu: 'Inicio',
    },
    {
      link: '/trips',
      icon: 'sliders',
      menu: 'Viajes asignados',
    },
    {
      link: '/activity',
      icon: 'disc',
      menu: 'Actividades',
    },
    {
      link: '/users',
      icon: 'award',
      menu: 'Usuarios',
    },
    {
      link: '/drivers',
      icon: 'file-text',
      menu: 'Choferes',
    },
    {
      link: '/button',
      icon: 'disc',
      menu: 'Buttons',
    },
    {
      link: '/forms',
      icon: 'layout',
      menu: 'Forms',
    },
    {
      link: '/alerts',
      icon: 'info',
      menu: 'Alerts',
    },
    {
      link: '/grid-list',
      icon: 'file-text',
      menu: 'Grid List',
    },
    {
      link: '/menu',
      icon: 'menu',
      menu: 'Menus',
    },
    {
      link: '/table',
      icon: 'grid',
      menu: 'Tables',
    },
    {
      link: '/expansion',
      icon: 'divide-circle',
      menu: 'Expansion Panel',
    },
    {
      link: '/chips',
      icon: 'award',
      menu: 'Chips',
    },
    {
      link: '/tabs',
      icon: 'list',
      menu: 'Tabs',
    },
    {
      link: '/progress',
      icon: 'bar-chart-2',
      menu: 'Progress Bar',
    },
    {
      link: '/toolbar',
      icon: 'voicemail',
      menu: 'Toolbar',
    },
    {
      link: '/progress-snipper',
      icon: 'loader',
      menu: 'Progress Snipper',
    },
    {
      link: '/tooltip',
      icon: 'bell',
      menu: 'Tooltip',
    },
    {
      link: '/snackbar',
      icon: 'slack',
      menu: 'Snackbar',
    },
    {
      link: '/slider',
      icon: 'sliders',
      menu: 'Slider',
    },
    {
      link: '/slide-toggle',
      icon: 'layers',
      menu: 'Slide Toggle',
    },
  ];

  logout(): void {
    this.authService.logout();
  }
}
