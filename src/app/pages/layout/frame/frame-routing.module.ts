import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame.component';


const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../../cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'client',
        loadChildren: () => import('../../client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../../history/history.module').then(m => m.HistoryModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameRoutingModule { }
