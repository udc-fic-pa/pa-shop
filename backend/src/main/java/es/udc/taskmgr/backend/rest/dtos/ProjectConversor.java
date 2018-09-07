package es.udc.taskmgr.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.taskmgr.backend.model.entities.Project;

public final class ProjectConversor {
	
	private ProjectConversor() {}
	
	public static List<ProjectDto> toProjectDtos(List<Project> projects) {
		return projects.stream().map(p -> toProjectDto(p)).collect(Collectors.toList());
	}
	
	public static ProjectDto toProjectDto(Project project) {
		return new ProjectDto(project.getId(), project.getName());
	}
	
	public static Project toProject(ProjectDto projectDto) {
		return new Project(projectDto.getName());
	}

}
