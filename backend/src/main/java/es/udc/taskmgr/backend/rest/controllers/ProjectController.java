package es.udc.taskmgr.backend.rest.controllers;

import static es.udc.taskmgr.backend.rest.dtos.ProjectConversor.toProject;
import static es.udc.taskmgr.backend.rest.dtos.ProjectConversor.toProjectDto;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import es.udc.taskmgr.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.taskmgr.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.taskmgr.backend.model.entities.Project;
import es.udc.taskmgr.backend.model.services.PermissionException;
import es.udc.taskmgr.backend.model.services.ProjectService;
import es.udc.taskmgr.backend.rest.dtos.ProjectDto;

@RestController
@RequestMapping("/projects")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;

	@PostMapping
	public ResponseEntity<ProjectDto> addProject(
		@RequestAttribute Long userId,
		@Validated({ProjectDto.AllValidations.class}) @RequestBody ProjectDto projectDto)
		throws DuplicateInstanceException, InstanceNotFoundException {
		
		Project project = projectService.addProject(userId, toProject(projectDto));
		
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest().path("/{id}")
			.buildAndExpand(project.getId()).toUri();
				
		return ResponseEntity.created(location).body(toProjectDto(project));

	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeProject(@RequestAttribute Long userId,
		@PathVariable("id") Long projectId) throws InstanceNotFoundException, PermissionException {
		
		projectService.removeProject(userId, projectId);
		
	}
	
	@PatchMapping("/{id}")
	public ProjectDto updateProjectPartial(@RequestAttribute Long userId, @PathVariable("id") Long projectId,
		@Validated({ProjectDto.PatchValidations.class}) @RequestBody ProjectDto updatesDto)
		throws InstanceNotFoundException, DuplicateInstanceException, PermissionException {
		
		return toProjectDto(projectService.updateProjectPartial(userId, projectId, getUpdatesMap(updatesDto)));
		
	}
	
	private Map<String, Object> getUpdatesMap(ProjectDto updatesDto) {
	
		Map<String, Object> map = new HashMap<>();

		map.put("name", updatesDto.getName());
		 		
		return map;
		 		
	}
	
}