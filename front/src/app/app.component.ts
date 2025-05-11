import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';



import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
	imports: [MatBadgeModule, MatListModule, MatCheckboxModule, FormsModule, MatFormFieldModule, 
	MatInputModule, MatIconModule, MatProgressBarModule, MatButtonModule, MatTooltipModule],
	changeDetection: ChangeDetectionStrategy.Default,
})

export class AppComponent implements OnInit {
    tasks: any;
	newTaskName: string = '';
	
    constructor(private apiService: ApiService) { };
    ngOnInit() {
        this.loadTasks();
    }
	
	loadTasks(){
		this.apiService.getTasks().subscribe(data => {
            this.tasks = data;
        });
	}
	
	addNewTask() {
		this.apiService.addTask(this.newTaskName).subscribe(() => this.loadTasks());
		this.newTaskName = '';
	}
	
	updateTask(id: string, completed: boolean) {
		this.apiService.updateTask(id, completed).subscribe(() => this.loadTasks());
	}
	
	deleteTask(id: string) {
		this.apiService.deleteTask(id).subscribe(() => this.loadTasks());
	}
	
}