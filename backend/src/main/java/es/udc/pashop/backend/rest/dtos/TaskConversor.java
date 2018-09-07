package es.udc.pashop.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.pashop.backend.model.entities.Task;

public class TaskConversor {
	
	private TaskConversor() {}
	
	public static List<TaskDto> toTaskDtos(List<Task> tasks) {
		return tasks.stream().map(t -> toTaskDto(t)).collect(Collectors.toList());
	}

	public static TaskDto toTaskDto(Task task) {
		return new TaskDto(task.getId(), task.getName(), task.isCompleted(), task.getProject().getId());
	}

	public static Task toTask(TaskDto taskDto) {
		return new Task(taskDto.getName(), taskDto.getCompleted());
	}

}
