package es.udc.pashop.backend.model.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.entities.UserDao;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDao userDao;

	@Override
	public User signUp(User user) throws DuplicateInstanceException {
		
		if (userDao.existsByUserName(user.getUserName())) {
			throw new DuplicateInstanceException("project.entities.user", user.getUserName());
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(User.RoleType.USER);
		userDao.save(user);
		
		return user;
		
	}

	@Override
	@Transactional(readOnly=true)
	public User login(String userName, String password) throws IncorrectLoginException {
		
		Optional<User> user = userDao.findByUserName(userName);
		
		if (!user.isPresent()) {
			throw new IncorrectLoginException(userName, password);
		}
		
		if (!passwordEncoder.matches(password, user.get().getPassword())) {
			throw new IncorrectLoginException(userName, password);
		}
		
		return user.get();
		
	}
	
	@Override
	public User loginFromId(Long id) throws InstanceNotFoundException {
		return permissionChecker.checkUser(id);
	}

	@Override
	public User updateProfile(User user) throws InstanceNotFoundException {
		
		User userToUpdate = permissionChecker.checkUser(user.getId());
		
		userToUpdate.setFirstName(user.getFirstName());
		userToUpdate.setLastName(user.getLastName());
		userToUpdate.setEmail(user.getEmail());
		
		return userToUpdate;

	}

	@Override
	public void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException {
		
		User user = permissionChecker.checkUser(id);
		
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new IncorrectPasswordException();
		} else {
			user.setPassword(passwordEncoder.encode(newPassword));
		}
		
	}

}
