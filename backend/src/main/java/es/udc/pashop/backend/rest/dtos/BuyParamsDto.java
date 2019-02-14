package es.udc.pashop.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class BuyParamsDto {
	
	private String postalAddress;
	private String postalCode;
	
	@NotNull
	@Size(min=1, max=200) 
	public String getPostalAddress() {
		return postalAddress;
	}

	public void setPostalAddress(String postalAddress) {
		this.postalAddress = postalAddress;
	}

	@NotNull
	@Size(min=1, max=20)
	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

}
