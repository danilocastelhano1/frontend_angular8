import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorysComponent } from './components/categorys/categorys.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorys', component: CategorysComponent },
  { path: 'posts', component: PostsComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
