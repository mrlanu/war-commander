import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AttackEditComponent} from './attack-edit/attack-edit.component';
import {TestComponent} from './test/test.component';


const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'attack-edit', component: AttackEditComponent},
  {path: 'test', component: TestComponent},
  /*{path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
      {path: 'charts/income-vs-expenses', component: BarChartComponent},
      {path: 'charts/spent-by-category', component: LineChartComponent},
      {path: 'dashboard', component: DashboardComponent},
      /!*{path: 'charts', component: ChartsComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'categories', component: CategoriesComponent}*!/
    ]},*/
  {path: '**', redirectTo: '/welcome-page'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
