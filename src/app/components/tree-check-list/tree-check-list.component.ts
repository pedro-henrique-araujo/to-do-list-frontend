import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from 'src/app/interface/to-do';

@Component({
  selector: 'app-tree-check-list',
  templateUrl: './tree-check-list.component.html',
  styleUrls: ['./tree-check-list.component.css'],
})
export class TreeCheckListComponent {
  @Input()
  public toDos: ToDo[] | undefined;

  @Input() showAddItemInput = true;

  public itemToAdd = { done: false, title: '' };

  @Output()
  public ascendToDo = new EventEmitter<ToDo>();

  private currentIndex!: number;

  public focusedIndex?: number;

  @Input()
  public addItemPlaceholder = 'item...';

  public ctrlKeyCommands = {
    ArrowLeft: () => {
      if (!this.ascendToDo.observed) return;
      if (this.toDos === undefined) return;
      const toDo = this.toDos[this.currentIndex];
      this.toDos.splice(this.currentIndex, 1);
      this.ascendToDo.emit(toDo);
    },

    ArrowRight: () => {
      if (this.currentIndex === 0 || this.toDos === undefined) return;
      const previousToDo = this.toDos[this.currentIndex - 1];
      const toDo = this.toDos[this.currentIndex];
      this.toDos.splice(this.currentIndex, 1);

      previousToDo.toDos = previousToDo.toDos || [];

      previousToDo.toDos.push(toDo);
    },

    ArrowUp: () => {
      if (this.currentIndex === 0 || this.toDos === undefined) return;
      const toDo = this.toDos[this.currentIndex];
      this.toDos.splice(this.currentIndex, 1);
      this.toDos.splice(this.currentIndex - 1, 0, toDo);
    },

    ArrowDown: () => {
      if (
        this.toDos === undefined ||
        this.currentIndex === this.toDos.length + 1
      )
        return;
      const toDo = this.toDos[this.currentIndex];
      this.toDos.splice(this.currentIndex, 1);
      this.toDos.splice(this.currentIndex + 1, 0, toDo);
    },
  };

  public handleKeyDown(event: KeyboardEvent, index: number) {
    if (!event.ctrlKey) return;
    this.moveCommand(event.key, index);
  }

  public moveCommand(command: string, index: number) {
    this.currentIndex = index;
    const commandFunction =
      this.ctrlKeyCommands[command as keyof typeof this.ctrlKeyCommands];

    if (!commandFunction) return;
    commandFunction();
  }

  public handleToDoAscending(toDo: ToDo, index: number) {
    this.toDos?.splice(index + 1, 0, toDo);
  }

  public addItem() {
    if (!this.itemToAdd.title) return;
    this.toDos?.push(this.itemToAdd);
    this.itemToAdd = { done: false, title: '' };
  }

  public remove(index: number) {
    this.toDos?.splice(index, 1);
  }

  public checkAsFocused(index: number) {
    this.focusedIndex = index;
  }

  public uncheckAsFocused(index: number) {
    this.focusedIndex = undefined;
  }
}
