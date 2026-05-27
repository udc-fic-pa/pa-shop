package es.udc.pashop.backend.rest.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateShoppingCartItemQuantityParamsDto(@NotNull Long productId, @Min(1) int quantity) {}
