package es.udc.pashop.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class TaskDto {
	
	public interface AllValidations {}
	
	public interface PatchValidations {}
	
	private Long id;
	private String name;
	private Boolean completed;
	private Long projectId;
	
	public TaskDto() {}

	public TaskDto(Long id, String name, boolean completed, Long projectId) {
		
		this.id = id;
		this.name = name.trim();
		this.completed = completed;
		this.projectId = projectId;
		
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	@NotNull(groups={AllValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, PatchValidations.class})
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name.trim();
	}
	
	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	@NotNull
	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

}