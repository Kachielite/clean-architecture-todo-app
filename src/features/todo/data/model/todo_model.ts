import {Todo} from "../../domain/entity/todo";

export class TodoModel extends Todo {
    constructor(
        public id: string,
        public title: string,
        public isCompleted: boolean
    ) {
        super(id, title, isCompleted);
    }

    static fromJson(json: any): TodoModel {
        return new TodoModel(json.id, json.title, json.is_completed);
    }

     static toJson(todo: Todo): any {
        return {
            id: todo.id,
            title: todo.title,
            is_completed: todo.isCompleted
        };
    }
}