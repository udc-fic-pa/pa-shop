package es.udc.pashop.backend.model.entities;

@SuppressWarnings("serial")
public class MaxQuantityExceededException extends Exception {
	
	private short maxAllowedIncrement;
	
	public MaxQuantityExceededException(short maxAllowedIncrement) {
		this.maxAllowedIncrement = maxAllowedIncrement;
	}
	
	public short getMaxAllowedIncrement() {
		return maxAllowedIncrement;
	}

}
