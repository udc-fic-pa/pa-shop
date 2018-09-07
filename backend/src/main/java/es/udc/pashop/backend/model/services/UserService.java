package es.udc.pashop.backend.model.services;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.User;

public interface UserService {
	
	User signUp(User user) throws DuplicateInstanceException;
	
	User login(String userName, String password) throws IncorrectLoginException;
	
	User loginFromId(Long id) throws InstanceNotFoundException;
	
	User updateProfile(User user) throws InstanceNotFoundException;
	
	void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException;

}
