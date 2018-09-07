package es.udc.pashop.backend.rest.dtos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticatedUserDto {
	
	private String serviceToken;
	private UserDto userDto;
	private List<ProjectDto> projectDtos;

	public AuthenticatedUserDto() {}
	
	public AuthenticatedUserDto(String serviceToken, UserDto userDto, List<ProjectDto> projectDtos) {
		
		this.serviceToken = serviceToken;
		this.userDto = userDto;
		this.projectDtos = projectDtos;
		
	}

	public String getServiceToken() {
		return serviceToken;
	}

	public void setServiceToken(String serviceToken) {
		this.serviceToken = serviceToken;
	}

	@JsonProperty("user")
	public UserDto getUserDto() {
		return userDto;
	}

	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}

	@JsonProperty("projects")
	public List<ProjectDto> getProjectDtos() {
		return projectDtos;
	}

	public void setProjectDtos(List<ProjectDto> projectDtos) {
		this.projectDtos = projectDtos;
	}

}
