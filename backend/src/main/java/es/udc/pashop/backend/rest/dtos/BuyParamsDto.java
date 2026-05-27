package es.udc.pashop.backend.rest.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BuyParamsDto(@NotNull @Size(min=1, max=200) String postalAddress,
	@NotNull @Size(min=1, max=20) String postalCode) {

	public BuyParamsDto {
		postalAddress = postalAddress != null ? postalAddress.trim() : null;
		postalCode = postalCode != null ? postalCode.trim() : null;
	}

}
