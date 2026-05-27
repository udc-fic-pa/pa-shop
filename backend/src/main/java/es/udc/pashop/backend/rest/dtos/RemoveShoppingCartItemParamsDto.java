package es.udc.pashop.backend.rest.dtos;

import jakarta.validation.constraints.NotNull;

public record RemoveShoppingCartItemParamsDto(@NotNull Long productId) {}
