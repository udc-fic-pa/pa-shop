package es.udc.pashop.backend.model.services;

import java.util.List;

public record Block<T>(List<T> items, boolean existMoreItems) {}

