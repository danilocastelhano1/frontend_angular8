import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataSourceService } from 'src/app/services/datasource.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: [];
  categorys: [];

  actionEdit: boolean = false;
  actionAdd: boolean = false;

  idFormControl = new FormControl('', [
  ]);
  categoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  pubDateFormControl = new FormControl('', [
    Validators.required,
  ]);
  contentFormControl = new FormControl('', [
    Validators.required,
  ]);

  settings = {
    mode: 'external',
    delete: {
      deleteButtonContent: '<i class="fas fa-trash fa-3x"></i>',
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="fas fa-plus-circle fa-3x"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fas fa-edit fa-3x"></i>',
    },
    columns: {
      id: {
        title: 'ID',
      },
      category__title: {
        title: 'Category',
        valuePrepareFunction: (cell, row) => {
          return row.category.title;
        }
      },
      publicationDate: {
        title: 'Pub. Date',
      },
      content: {
        title: 'Content',
      },
    },
  };
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
        this.getCategorys();
      },
      (err) => {
        console.log('error get Posts: ' + JSON.stringify(err))
      }
    )
  }

  getCategorys() {
    this.dataSource.get('api/category/').subscribe(
      (res) => {
        this.categorys = res;
      },
      (err) => {
        console.log('error get categorys: ' + JSON.stringify(err))
      }
    )
  }

  onCreate(event) {
    this.idFormControl.setValue("");
    this.contentFormControl.setValue("");
    this.pubDateFormControl.setValue("");
    this.categoryFormControl.setValue("");

    this.actionAdd = !this.actionAdd;
  }

  onEdit(event) {
    this.idFormControl.setValue(event.data.id);
    this.contentFormControl.setValue(event.data.content);
    this.pubDateFormControl.setValue(event.data.publicationDate);
    this.categoryFormControl.setValue(event.data.categoryID);

    this.actionEdit = !this.actionEdit;
  }

  onDelete(event) {
    if (confirm("Confirm Delete Posts?")) {
      this.dataSource.delete('api/post/' + event.data.id).subscribe(
        (res) => {
          this.getPosts()
        },
        (err) => {
          console.log('error delete Post ', err)
        }
      )
    }
  }

  SaveOrEdit() {
    let body = {}
    if (this.actionAdd) {
      body = {
        categoryID: this.categoryFormControl.value,
        content: this.contentFormControl.value,
        publicationDate: this.pubDateFormControl.value
      }
    } else {
      body = {
        ID: this.idFormControl.value,
        categoryID: this.categoryFormControl.value,
        content: this.contentFormControl.value,
        publicationDate: this.pubDateFormControl.value
      }
    }

    if (this.actionEdit) {
      this.dataSource.update(body, 'api/post').subscribe(
        (res) => {
          this.getPosts()
        },
        (err) => {
          console.log('error update Posts ', err)
        }
      )
    }
    if (this.actionAdd) {
      this.dataSource.post(body, 'api/post/').subscribe(
        (res) => {
          this.getPosts()
        },
        (err) => {
          console.log('error add post ', err)
        }
      )

    }

    this.actionAdd = false;
    this.actionEdit = false;
  }

}
