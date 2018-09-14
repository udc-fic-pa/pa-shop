package es.udc.pashop.backend.rest.dtos;

import java.util.ArrayList;
import java.util.List;

import es.udc.pashop.backend.model.entities.Category;

public class CategoryConversor {
	
	private CategoryConversor() {}
	
	public final static CategoryDto toCategoryDto(Category category) {
		return new CategoryDto(category.getId(), category.getName());
	}
	
	public final static List<CategoryDto> toCategoryDtos(Iterable<Category> categories) {
		
		List<CategoryDto> categoryDtos = new ArrayList<>();
		
		for (Category category : categories) {
			categoryDtos.add(toCategoryDto(category));
		}
		
		return categoryDtos;
		
	}

}
