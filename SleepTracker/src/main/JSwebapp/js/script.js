window.addEventListener('load', function(e) {
	e.preventDefault();
	init();
});

function init() {
	console.log('script.js loaded');
	document.sleepForm.search.addEventListener('click', function(e) {
		e.preventDefault();
		var sleepId = document.sleepForm.sleepId.value;
		if (!isNaN(sleepId) && sleepId > 0) {
			getSleep(sleepId);
		}
	});

	document.sleepForm.sleepListTable.addEventListener('click', function(e) {
		e.preventDefault();
		getAllSleep();


	});

	document.newSleepForm.create.addEventListener('click', function(e) {
		e.preventDefault();
		createSleepEntry();
	});
}

function getAllSleep() {
	console.log('getAllSleep called');

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "api/sleeplist");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var dataJson = xhr.responseText;
				var data = JSON.parse(dataJson);
				populateSleepTable(data);
				averageSleep(data);
			} else {
				displayError('Sleep entries not found');

			}

		}
	};
	xhr.send();

}

function getSleep(sleepId) {
	console.log('getSleep called');

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "api/sleeplist/" + sleepId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var dataJson = xhr.responseText;
				var data = JSON.parse(dataJson);
				displaySleep(data);
			} else {
				if (xhr.status === 404) {
					displayError('Sleep entry not found');
				} else {
					displayError('Error retrieving sleep entry ' + sleepId);
				}
			}
		}
	};
	xhr.send();
}

function displaySleep(sleep) {
	console.log('displaySleep called')
	var dataDiv = document.getElementById('sleepData');
	dataDiv.textContent = '';
	
	let sleepId = sleep.id;

	let sleepStartHead = document.createElement('h4');
	sleepStartHead.textContent = 'Sleep start time';
	dataDiv.appendChild(sleepStartHead);
	let sleepStart = document.createElement('p');
	sleepStart.textContent = sleep.startSleepTime;
	dataDiv.appendChild(sleepStart);

	let sleepEndHead = document.createElement('h4');
	sleepEndHead.textContent = 'Sleep end time';
	dataDiv.appendChild(sleepEndHead);
	let sleepEnd = document.createElement('p');
	sleepEnd.textContent = sleep.endSleepTime;
	dataDiv.appendChild(sleepEnd);

	let sleepLocationTempHead = document.createElement('h4');
	sleepLocationTempHead.textContent = 'Room temperature (Fahrenheit)';
	dataDiv.appendChild(sleepLocationTempHead);
	let sleepLocationTemp = document.createElement('p');
	sleepLocationTemp.textContent = sleep.sleepLocationTemp;
	dataDiv.appendChild(sleepLocationTemp);

	let restfulnessHead = document.createElement('h4');
	restfulnessHead.textContent = 'Restfulness upon waking';
	dataDiv.appendChild(restfulnessHead);
	let restfulness = document.createElement('p');
	restfulness.textContent = sleep.wakingRestfulness;
	dataDiv.appendChild(restfulness);

	dynamicForm(sleep);


}

function dynamicForm(sleep) {
	console.log('dynamicForm called')
	console.log(sleep);
	var form = document.createElement('form');
	form.name = 'updatedSleepForm';

	var sleepId = document.createElement('input');
	sleepId.name = 'sleepId';
	sleepId.type = 'number';
	sleepId.value = sleep.id;
	form.appendChild(sleepId);

	var dynHeading = document.createElement('h3');
	dynHeading.textContent = 'Update or Delete this entry';
	form.appendChild(dynHeading);

	var startSleepTime = document.createElement('input');
	startSleepTime.name = 'startSleepTime';
	startSleepTime.type = 'text';
	startSleepTime.placeholder = 'start sleep time';
	startSleepTime.value = sleep.startSleepTime;
	form.appendChild(startSleepTime);
	form.appendChild(document.createElement('br'));

	var endSleepTime = document.createElement('input');
	endSleepTime.name = 'endSleepTime';
	endSleepTime.type = 'text';
	endSleepTime.placeholder = 'end sleep time';
	endSleepTime.value = sleep.endSleepTime;
	form.appendChild(endSleepTime);
	form.appendChild(document.createElement('br'));

	var sleepLocationTemp = document.createElement('input');
	sleepLocationTemp.name = 'sleepLocationTemp';
	sleepLocationTemp.type = 'number';
	sleepLocationTemp.placeholder = 'room temperature';
	sleepLocationTemp.value = sleep.sleepLocationTemp;
	form.appendChild(sleepLocationTemp);
	form.appendChild(document.createElement('br'));

	var wakingRestfulness = document.createElement('input');
	wakingRestfulness.name = 'wakingRestfulness';
	wakingRestfulness.type = 'number';
	wakingRestfulness.placeholder = 'rate from 1-5';
	wakingRestfulness.value = sleep.wakingRestfulness;
	form.appendChild(wakingRestfulness);
	form.appendChild(document.createElement('br'));

	var formSubmit = document.createElement('input');
	formSubmit.name = 'submit';
	formSubmit.type = 'submit';
	formSubmit.value = 'Submit update';
	
	formSubmit.addEventListener('click', function(e) {
		e.preventDefault();
		var form = e.target.parentElement;
		updateSleepEntry(sleepId.value);
		form.reset();
	});
	
	var formDelete = document.createElement('input');
	formDelete.name = 'submit';
	formDelete.type = 'submit';
	formDelete.value = 'Delete entry';

	formDelete.addEventListener('click', function(e) {
		e.preventDefault();
		deleteSleepEntry(sleepId.value);
	});
	

	form.appendChild(formSubmit);
	form.appendChild(formDelete);
	document.body.appendChild(form);

}

function displayError(message) {
	var dataDiv = document.getElementById('sleepData');
	dataDiv.textContent = message;
}

function createSleepEntry() {
	console.log('createSleepEntry called');
	let form = document.newSleepForm;
	let sleepEntry = {};
	sleepEntry.startSleepTime = form.startSleepTime.value;
	sleepEntry.endSleepTime = form.endSleepTime.value;
	sleepEntry.sleepLocationTemp = form.sleepLocationTemp.value;
	sleepEntry.wakingRestfulness = form.wakingRestfulness.value;
	console.log(sleepEntry);
	postSleepEntry(sleepEntry);
}

function postSleepEntry(sleepEntry) {
	console.log('in postSleepEntry');
	let sleepJson = JSON.stringify(sleepEntry);
	console.log(sleepJson);

	let xhr = new XMLHttpRequest();
	let uri = "api/sleeplist";
	xhr.open("POST", uri);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdSleepEntry = JSON.parse(xhr.responseText);
				displaySleep(createdSleepEntry);
			} else {
				if (xhr.status === 400) {
					displayError(`Invalid sleep data, unable to create entry from <pre>${sleepJson}</pre>`);
				} else {
					displayError('Unknown error creating sleep entry: '
							+ xhr.status);
				}
			}
		}
	};
	xhr.send(sleepJson);
}

function populateSleepTable(allSleepEntries) {
	console.log('populate table function called');
	let divSleepTable = document.getElementById('sleepListTable')
	let sleepTable = document.createElement('table');
	divSleepTable.appendChild(sleepTable);
	let sleepHeader = document.createElement('thead');
	divSleepTable.appendChild(sleepHeader);
	let sleepRow = document.createElement('tr');
	divSleepTable.appendChild(sleepRow);

	let sleepHeadingId = document.createElement('th');
	sleepHeadingId.textContent = 'ID';
	divSleepTable.appendChild(sleepHeadingId);
	let sleepHeadingStart = document.createElement('th');
	sleepHeadingStart.textContent = 'Start Sleep';
	divSleepTable.appendChild(sleepHeadingStart);
	let sleepHeadingEnd = document.createElement('th');
	sleepHeadingEnd.textContent = 'End Sleep Time';
	divSleepTable.appendChild(sleepHeadingEnd);
	let sleepHeadingTemp = document.createElement('th');
	sleepHeadingTemp.textContent = 'Room temperature';
	divSleepTable.appendChild(sleepHeadingTemp);
	let sleepHeadingRest = document.createElement('th');
	sleepHeadingRest.textContent = 'Restfulness Upon Waking';
	divSleepTable.appendChild(sleepHeadingRest);

	for (let i = 0; i < allSleepEntries.length; i++) {

		let sleepRow = document.createElement('tr');
		divSleepTable.appendChild(sleepRow);
		let sleepId = document.createElement('td');
		sleepId.textContent = allSleepEntries[i].id;
		divSleepTable.appendChild(sleepId);
		let sleepRowStart = document.createElement('td');
		sleepRowStart.textContent = allSleepEntries[i].startSleepTime;
		divSleepTable.appendChild(sleepRowStart);
		let sleepRowEnd = document.createElement('td');
		sleepRowEnd.textContent = allSleepEntries[i].endSleepTime;
		divSleepTable.appendChild(sleepRowEnd);
		let sleepRowTemp = document.createElement('td');
		sleepRowTemp.textContent = allSleepEntries[i].sleepLocationTemp;
		divSleepTable.appendChild(sleepRowTemp);
		let sleepRowRest = document.createElement('td');
		sleepRowRest.textContent = allSleepEntries[i].wakingRestfulness;
		divSleepTable.appendChild(sleepRowRest);

		sleepId.addEventListener('click', function(e) {
			e.preventDefault();
			getSleep(allSleepEntries[i].id);
			console.log('getSleep called');
			console.log('averageSleep called')

		});

	}

}

function averageSleep(allSleepEntries) {
	var total = 0;
	var average = 0;
	
	for (let i = 0; i < allSleepEntries.length; i++) {
		total += allSleepEntries[i].wakingRestfulness;
//		total += parseInt(allSleepEntries[i].sleepLocationTemp);
		console.log(total);
		average = total/allSleepEntries.length;
		average= Math.floor(average);
		console.log(average);
	}
	
	let averageDiv = document.getElementById('averageDiv');
	let h1 = document.createElement('h3');
	h1.textContent = "You have averaged a wakefulness rating of " + average + ".";
	averageDiv.appendChild(h1);
}


function updateSleepEntry(sleepId) {
	console.log('in updateSleepEntry');
	console.log(sleepId);
	let updatedEntry = {};
	updatedEntry.sleepId = sleepId;
	updatedEntry.startSleepTime = updatedSleepForm.startSleepTime.value;
	updatedEntry.endSleepTime = updatedSleepForm.endSleepTime.value;
	updatedEntry.sleepLocationTemp = updatedSleepForm.sleepLocationTemp.value;
	updatedEntry.wakingRestfulness = updatedSleepForm.wakingRestfulness.value;

	putSleepEntry(sleepId, updatedEntry);
}

function putSleepEntry(sleepId, updatedEntry) {
	console.log('in putSleepEntry');
	console.log(updatedEntry);
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/sleeplist/' + sleepId);
	xhr.setRequestHeader('Content-type', 'application/json');
	let convertedSleepUpdate = JSON.stringify(updatedEntry);
	console.log(convertedSleepUpdate);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('loud and clear');
			if (xhr.status === 200 || xhr.status === 201) {
				console.log('status good');
				let updatedSleep = JSON.parse(xhr.responseText);
				getAllSleep();
				console.log('should be displayed');
			} else {
				console.log("The update was unsuccessful.");
			}
		}
	};
	xhr.send(convertedSleepUpdate);
}


function deleteSleepEntry(sleepId) {
	console.log('in deleteSleepEntry');
	console.log(sleepId);
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/sleeplist/' + sleepId);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('delete loud and clear');
			if (xhr.status === 204) {
				getAllSleep();
			} else {
				displayError('Unknown error deleting sleep entry: '
						+ xhr.status);

			}
		}
	}
	xhr.send();
}
