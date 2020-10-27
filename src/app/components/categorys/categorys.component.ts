import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataSourceService } from 'src/app/services/datasource.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  actionEdit: boolean = false;
  actionAdd: boolean = false;

  idFormControl = new FormControl('', [
  ]);
  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  categorys: [];

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
      title: {
        title: 'Title',
      },
    },
  };

  constructor(
    private dataSource: DataSourceService
  ) { }

  ngOnInit() {
    this.getCategorys();
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
    this.titleFormControl.setValue("");
    this.actionAdd = !this.actionAdd;
  }

  onEdit(event) {
    this.idFormControl.setValue(event.data.id);
    this.titleFormControl.setValue(event.data.title);

    this.actionEdit = !this.actionEdit;
  }

  onDelete(event) {
    if (confirm("Confirm Delete Category?")) {
      this.dataSource.delete('api/category/' + event.data.id).subscribe(
        (res) => {
          this.getCategorys()
        },
        (err) => {
          console.log('error delete category ', err)
        }
      )
    }
  }

  SaveOrEdit() {
    let body = {}
    if (this.actionAdd) {
      body = {
        title: this.titleFormControl.value
      }
    } else {
      body = {
        ID: this.idFormControl.value,
        title: this.titleFormControl.value
      }
    }

    if (this.actionEdit) {
      this.dataSource.update(body, 'api/category/').subscribe(
        (res) => {
          this.getCategorys()
        },
        (err) => {
          console.log('error update category ', err)
        }
      )
    }

    if (this.actionAdd) {
      this.dataSource.post(body, 'api/category/').subscribe(
        (res) => {
          this.getCategorys()
        },
        (err) => {
          console.log('error add category ', err)
        }
      )
    }

    this.actionAdd = false;
    this.actionEdit = false;
  }

}
