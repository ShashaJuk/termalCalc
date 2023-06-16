export interface Material {
	coefficient_of_thermal_conductivity: number;
	width: number;
}

interface SearchHeatTransferResultParams {
	cityId: number;
	innerTemperature: number;
	buildingTypeId: number;

	coefficientOfThermalUniformity: number;
	materials: Material[];
}

interface Search {
	search: string;
	offset: number;
	limit: number;
}

interface SearchInCategory extends Search {
	categoryId: number;
}

export async function searchCategories(params: Search) {
	const response = await fetch('http://localhost:8080/termalCalc/searchCategories/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(params)
	});

	return await response.json();
}

export async function searchMaterials(params: SearchInCategory) {
	const response = await fetch('http://localhost:8080/termalCalc/searchMaterials/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(params)
	});
	return await response.json();
}

export async function searchCity(params: Search) {
	const response = await fetch('http://localhost:8080/termalCalc/searchCity/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(params)
	});
	return await response.json();
}

export async function searchBuildingType(params: Search) {
	const response = await fetch('http://localhost:8080/termalCalc/searchBuildingType', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(params)
	});
	return await response.json();
}

export async function getHeatTransferResult(params: SearchHeatTransferResultParams) {
	const response = await fetch('http://localhost:8080/termalCalc//getHeatTransferResult/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(params)
	});
	return await response.json();
}
