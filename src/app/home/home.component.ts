import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, isFormRecord } from '@angular/forms';
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
import { CookieService } from 'ngx-cookie-service';

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
  public idUser = this.cookieService.get('idUser');

  constructor(private taskService: TaskService, private toastr: ToastrService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.taskService.getTaskByIdUser(this.idUser).subscribe(
      (data) => {
        this.toDo = data
          .filter((element) => element.idState === '64994a92227a1f3ddfa68740')
          .map((element) => element.task ?? '');
        this.inProgress = data
          .filter((element) => element.idState === '64994a92227a1f3ddfa68741')
          .map((element) => element.task ?? '');
        this.done = data
          .filter((element) => element.idState === '64994a92227a1f3ddfa68742')
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
        'cdk-drop-list-0': '64994a92227a1f3ddfa68740',
        'cdk-drop-list-1': '64994a92227a1f3ddfa68741',
        'cdk-drop-list-2': '64994a92227a1f3ddfa68742',
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
        idUser: this.idUser,
        idState: '64994a92227a1f3ddfa68740',
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
    this.toastr.success('Vous avez bien créé ' + test.toLowerCase(), 'Validation');
  }
}
