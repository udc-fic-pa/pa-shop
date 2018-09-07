package es.udc.taskmgr.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ProjectDto {
	
	public interface AllValidations {}
	
	public interface PatchValidations {}
	
	private Long id;
	private String name;
	
	public ProjectDto() {}

	public ProjectDto(Long id, String name) {
		this.id = id;
		this.name = name.trim();
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
	
}