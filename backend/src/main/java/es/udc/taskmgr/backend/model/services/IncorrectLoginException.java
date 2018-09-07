package es.udc.taskmgr.backend.model.services;

@SuppressWarnings("serial")
public class IncorrectLoginException extends Exception {
	
	private String userName;
	private String password;

	public IncorrectLoginException(String userName, String password) {
		
		this.userName = userName;
		this.password = password;
		
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
