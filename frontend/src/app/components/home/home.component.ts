import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'pn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = '';
  form!: FormGroup;

  cols: any[] = [];
  nodes: any[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      inputtext: ['']
    });

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'size', header: 'Size'},
      {field: 'type', header: 'Type'}
    ];

    this.nodes = [
      {
        'data': {
          'name': 'Documents',
          'size': '75kb',
          'type': 'Folder'
        }, 'children': [
          {
            'data': {
              'name': 'Expenses.doc',
              'size': '30kb',
              'type': 'Document'
            }
          }, {
            'data': {
              'name': 'Expenses2.doc',
              'size': '33kb',
              'type': 'Document'
            }
          }
        ], 'expanded': true
      }
    ];
  }

  upper() {
    this.title = this.title.toUpperCase();
    this.form.patchValue({inputtext: 'inputtext'});
  }
}
