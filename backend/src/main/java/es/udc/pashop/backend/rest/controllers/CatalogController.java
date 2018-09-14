package es.udc.pashop.backend.rest.controllers;

import static es.udc.pashop.backend.rest.dtos.CategoryConversor.toCategoryDtos;
import static es.udc.pashop.backend.rest.dtos.ProductConversor.toProductDto;
import static es.udc.pashop.backend.rest.dtos.ProductConversor.toProductSummaryDtos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Product;
import es.udc.pashop.backend.model.services.Block;
import es.udc.pashop.backend.model.services.CatalogService;
import es.udc.pashop.backend.rest.dtos.BlockDto;
import es.udc.pashop.backend.rest.dtos.CategoryDto;
import es.udc.pashop.backend.rest.dtos.ProductDto;
import es.udc.pashop.backend.rest.dtos.ProductSummaryDto;

@RestController
public class CatalogController {
	
	@Autowired
	private CatalogService catalogService;
	
	@GetMapping("/categories")
	public List<CategoryDto> findAllCategories() {
		return toCategoryDtos(catalogService.findAllCategories());
	}
	
	@GetMapping("/products/{id}")
	public ProductDto findProductById(@PathVariable("id") Long id) throws InstanceNotFoundException {
		return toProductDto(catalogService.findProductById(id));
	}
	
	@GetMapping("/products")
	public BlockDto<ProductSummaryDto> findProducts(
		@RequestParam(name="categoryId", required=false) Long categoryId,
		@RequestParam(name="keywords", required=false) String keywords, 
		@RequestParam(name="startIndex", defaultValue="0") int startIndex, 
		@RequestParam(name="count", defaultValue="10") int count) {
		
		Block<Product> productBlock = catalogService.findProducts(categoryId, keywords, startIndex, count);
		
		return new BlockDto<>(toProductSummaryDtos(productBlock.getItems()), productBlock.getExistMoreItems());
		
	}

}
