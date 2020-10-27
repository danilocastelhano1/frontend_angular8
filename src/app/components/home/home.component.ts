import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/services/datasource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: [];

  constructor(
    private dataSource: DataSourceService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.dataSource.get('api/post/').subscribe(
      (res) => {
        this.posts = res;
      },
      (err) => {
        console.log('error get Posts: ' + JSON.stringify(err))
      }
    )
  }

}
