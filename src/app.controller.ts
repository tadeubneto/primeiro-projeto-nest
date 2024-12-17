import { Body, Controller, Get, Param, Patch, Post, Query, Res} from '@nestjs/common';
import { Response } from 'express'

interface Todo {
  id: number,
  title: string,
  completed: boolean;
}

@Controller('todos')
export class TodosController {
  private todos: Todo[] = []
  private currentId = 1

  @Post()
  create(@Body() todoData: {title: string, completed: boolean}, @Res() res: Response) {
     
    if(!todoData.title || todoData.title.trim().length === 0){
      return res.status(400).json({ error: 'O TITULO DA TAREFA NAO PODE SER VAZIO'})
    }    
    const todo: Todo = {
      id: this.currentId++,
      title: todoData.title,
      completed: todoData.completed ?? false
    };
    this.todos.push(todo)
    return res.status(201).json(todo)
  } 
  
  @Get()
  findAll(@Query('status') status: string){
    if(status === 'completed'){
      return this.todos.filter(todo => todo.completed === true)
    }else if(status === 'incomplete'){
      return this.todos.filter(todo => todo.completed === false)
    }else{
      return this.todos
    }
  }
  
  @Patch('completed-all')
  completeAllTodos(@Res() res: Response) {
    this.todos = this.todos.map(todo => ({...todo, completed: true}))
    return res.status(200).json({message: 'Todas as tarefas estão concluidas'})
  }


}