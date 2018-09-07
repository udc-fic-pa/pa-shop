package es.udc.pashop.backend.rest.controllers;

import static es.udc.pashop.backend.rest.dtos.TaskConversor.toTask;
import static es.udc.pashop.backend.rest.dtos.TaskConversor.toTaskDto;
import static es.udc.pashop.backend.rest.dtos.TaskConversor.toTaskDtos;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Task;
import es.udc.pashop.backend.model.services.PermissionException;
import es.udc.pashop.backend.model.services.TaskService;
import es.udc.pashop.backend.rest.dtos.TaskDto;

@RestController
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
		
	@GetMapping
	public List<TaskDto> findTasks(@RequestAttribute Long userId, @RequestParam("projectId") Long projectId)
		throws InstanceNotFoundException, PermissionException {
		
		return toTaskDtos(taskService.findTasks(userId, projectId));
			
	}
	
	@PostMapping
	public ResponseEntity<TaskDto> addTask(
		@RequestAttribute Long userId,
		@Validated({TaskDto.AllValidations.class}) @RequestBody TaskDto taskDto)
		throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {
		
		taskDto.setCompleted(false);
		
		Task task = taskService.addTask(userId, taskDto.getProjectId(), toTask(taskDto));
		
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest().path("/{id}")
			.buildAndExpand(task.getId()).toUri();
				
		return ResponseEntity.created(location).body(toTaskDto(task));

	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeTask(@RequestAttribute Long userId, @PathVariable("id") Long taskId) 
		throws InstanceNotFoundException, PermissionException {
		
		taskService.removeTask(userId, taskId);
		
	}
	
	@PatchMapping("/{id}")
	public TaskDto updateTaskPartial(
		@RequestAttribute Long userId,
		@PathVariable("id") Long taskId,
		@Validated({TaskDto.PatchValidations.class}) @RequestBody TaskDto updatesDto)
		throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {

		return toTaskDto(taskService.updateTaskPartial(userId, taskId, getUpdatesMap(updatesDto)));

	}
	
	private Map<String, Object> getUpdatesMap(TaskDto updatesDto) {
		
		Map<String, Object> map = new HashMap<>();

		map.put("name", updatesDto.getName());
		map.put("completed", updatesDto.getCompleted());
		 		
		return map;
		 		
	}
	
}