import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../service/to-do-list.service';
import { Pagination } from '../interface/pagination';
import { ToDoList } from '../interface/to-do-list';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public pagination?: Pagination<ToDoList>;
  public recordCopiedToClipboard: string | undefined;

  constructor(private service: ToDoListService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getPagination(0, 5).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  public share(id: string | undefined) {
    this.recordCopiedToClipboard = id;
    const editLink = environment.appUrl + '/edit/' + id;
    navigator.clipboard.writeText(editLink);
    setTimeout(() => (this.recordCopiedToClipboard = undefined), 5000);
  }
}
