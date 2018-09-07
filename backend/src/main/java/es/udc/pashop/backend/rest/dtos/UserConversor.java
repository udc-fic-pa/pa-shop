package es.udc.pashop.backend.rest.dtos;

import static es.udc.pashop.backend.rest.dtos.ProjectConversor.toProjectDtos;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import es.udc.pashop.backend.model.entities.Project;
import es.udc.pashop.backend.model.entities.User;

public class UserConversor {
	
	private UserConversor() {}
	
	public final static UserDto toUserDto(User user) {
		return new UserDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),
			user.getRole().toString());
	}
	
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.getUserName(), userDto.getPassword(), userDto.getFirstName(), userDto.getLastName(),
			userDto.getEmail());
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		List<Project> projects = new ArrayList<>(user.getProjects());
		
		projects.sort(Comparator.comparing(Project::getId));
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user), toProjectDtos(projects));
		
	}

}
