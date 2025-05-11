//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    getTasks() {
        return this.http.get('http://localhost:8000/api/all');
    }
	
	addTask(name: string) {
        return this.http.put('http://localhost:8000/api/add/' + name, null);
    }
	
	updateTask(id: string, completed: boolean) {
		return this.http.patch('http://localhost:8000/api/update/'+ id + '/' + completed, null);
    }
	
	deleteTask(id: string) {
		return this.http.delete('http://localhost:8000/api/delete/'+ id);
	}
}