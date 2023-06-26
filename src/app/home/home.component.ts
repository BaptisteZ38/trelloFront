import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, NgFor, CdkDrag, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  public toDo: string[] = [];
  public inProgress: string[] = [];
  public done: string[] = [];

  constructor(private taskService: TaskService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.taskService.getAllTask().subscribe(
      (data) => {
        this.toDo = data
          .filter((element) => element.idState === '647f2250d3d5c25025bce70a')
          .map((element) => element.task ?? '');
        this.inProgress = data
          .filter((element) => element.idState === '647f2250d3d5c25025bce70b')
          .map((element) => element.task ?? '');
        this.done = data
          .filter((element) => element.idState === '647f2250d3d5c25025bce70c')
          .map((element) => element.task ?? '');
      },
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const itemMoved = event.container.data[event.currentIndex];
      const containerIdToStateIdMap: { [key: string]: string } = {
        'cdk-drop-list-0': '647f2250d3d5c25025bce70a',
        'cdk-drop-list-1': '647f2250d3d5c25025bce70b',
        'cdk-drop-list-2': '647f2250d3d5c25025bce70c',
      };

      this.taskService.getTaskByName(itemMoved).subscribe(
        (data) => {
        const containerId = event.container.id;
        const idState = containerIdToStateIdMap[containerId];

        if (idState) {
          const task: Task = {
            id: data.id,
            task: data.task,
            idUser: data.idUser,
            idState: idState,
          };
          this.taskService.updateTask(data.id ?? '', task);
        }
      });
    }
  }

  applyForm = new FormGroup({
    tache: new FormControl(''),
  });

  submitForm() {
    if (this.applyForm.value.tache !== '') {
      const task: Task = {
        task: this.applyForm.value.tache,
        idUser: '647f2250d3d5c25025bce709',
        idState: '647f2250d3d5c25025bce70a',
      };

      this.taskService.createTask(task).subscribe(
        (createdTask) => {
          this.showToastr(this.applyForm.value.tache ?? '');
          this.toDo.push(createdTask.task ?? '');
          this.applyForm.reset();
        },
      );
    }
  }

  showToastr(test:String){
    this.toastr.success('Vous avez bien créer' + test, 'Validation');
  }
}
