package es.udc.pashop.backend.rest.dtos;
public record AuthenticatedUserDto(
	String serviceToken,
	UserDto user,
	ShoppingCartDto shoppingCart) {}
