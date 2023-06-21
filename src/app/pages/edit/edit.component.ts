import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from 'src/app/interface/to-do';
import { ToDoList } from 'src/app/interface/to-do-list';
import { ToDoListService } from 'src/app/service/to-do-list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public id?: string | null;

  public toDoList: ToDoList = {
    id: '',
    title: '',
    toDos: [],
    accessType: 1,
  };

  public dirty = false;

  public askConfirmationToDelete = false;

  constructor(
    private toDoListService: ToDoListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) return;

    this.toDoListService.getById(this.id).subscribe((toDoList) => {
      this.toDoList = toDoList;
    });
  }

  public showDeleteButtonFeature() {
    return this.id && this.toDoList.accessType === 0;
  }

  public save() {
    if (!this.id) {
      this.saveNew();
      return;
    }
    this.toDoList.id = this.id as string;
    this.toDoListService.update(this.toDoList).subscribe(() => {
      this.dirty = false;
    });
  }

  public saveNew() {
    this.toDoList.id = undefined;
    this.toDoListService.insert(this.toDoList).subscribe((toDoList) => {
      this.router.navigate(['edit', toDoList.id]);
    });
  }

  public askForConfirmationToDelete() {
    this.askConfirmationToDelete = true;
    setTimeout(() => (this.askConfirmationToDelete = false), 2000);
  }

  public delete() {
    this.toDoListService.delete(this.id as string).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public notifyChange() {
    this.dirty = true;
  }
}
