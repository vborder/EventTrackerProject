window.addEventListener('load', function() {
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
				console.log(data);
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
	
	let sleepStartHead = document.createElement('h4');
	sleepStartHead.textContent = 'Sleep start time';
	dataDiv.appendChild(sleepStartHead);
	let sleepStart = document.createElement('p');
	sleepStart.textContent = sleep.startSleepTime;
	// sleepStart = formatDate(sleepStart);
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
	
	let enabledHead = document.createElement('h4');
	enabledHead.textContent = 'Enabled';
	dataDiv.appendChild(enabledHead);
	let enabled = document.createElement('p');
	enabled.textContent = sleep.enabled;
	dataDiv.appendChild(enabled);

	var button = document.createElement('input');
	button.name = 'submit';
	button.type = 'submit';
	button.value = 'Delete entry';
	dataDiv.appendChild(button);
	
	button.addEventListener('click', function(e) {
		e.preventDefault();
		deleteSleepEntry(sleep.id);
//		console.log(sleep.id);
	});
	
	dynamicForm(sleep);
//	updateSleepEntry(sleep.id);
	
	console.log('dynamicForm called');
	console.log('deleteButton called');
	
}

//function deleteButton(sleep) {
//var button = document.createElement('button');
//button.name = 'delete';
//button.type = 'submit';
//button.value = 'Delete entry';
//
//button.addEventListener('click', function(e) {
//	e.preventDefault();
//	var button = e.target.parentElement;
//});
//}	

//function deleteEntry(sleep) {
//	console.log('deleteEntry called');
//	var button = document.createElement('input');
//	button.name = 'submit';
//	button.type = 'submit';
//	button.value = 'Submit update';
//	
//	button.addEventListener('click', function(e) {
//		e.preventDefault();
//		deleteSleepEntry(sleep.id);
//	});
//	
//}

function dynamicForm(sleep) {
	console.log('dynamicForm called')
	var form = document.createElement('form');
	form.name = 'updatedSleepForm';
	
	var sleepId = document.createElement('input');
	sleepId.name = 'sleepId';
	sleepId.type = 'hidden';
	sleepId.value = sleep.id;
	console.log(sleepId.value);
	form.appendChild(sleepId);
	
	var dynHeading = document.createElement('h3');
	dynHeading.textContent = 'Update this entry';
	form.appendChild(dynHeading);
		
	var startSleepTime = document.createElement('input');
	startSleepTime.name = 'startSleepTime';
	startSleepTime.type = 'text';
	startSleepTime.placeholder = 'start sleep time';
	form.appendChild(startSleepTime);
	form.appendChild(document.createElement('br'));
	
	var endSleepTime = document.createElement('input');
	endSleepTime.name = 'endSleepTime';
	endSleepTime.type = 'text';
	endSleepTime.placeholder = 'end sleep time';
	form.appendChild(endSleepTime);
	form.appendChild(document.createElement('br'));
	
	var sleepLocationTemp = document.createElement('input');
	sleepLocationTemp.name = 'sleepLocationTemp';
	sleepLocationTemp.type = 'number';
	sleepLocationTemp.placeholder = 'room temperature';
	form.appendChild(sleepLocationTemp);
	form.appendChild(document.createElement('br'));
	
	var wakingRestfulness = document.createElement('input');
	wakingRestfulness.name = 'wakingRestfulness';
	wakingRestfulness.type = 'number';
	wakingRestfulness.placeholder = 'rate from 1-5';
	form.appendChild(wakingRestfulness);
	form.appendChild(document.createElement('br'));
	
	var formSubmit = document.createElement('input');
	formSubmit.name = 'submit';
	formSubmit.type = 'submit';
	formSubmit.value = 'Submit update';
	
	formSubmit.addEventListener('click', function(e) {
		e.preventDefault();
		var form = e.target.parentElement;
//		updateSleepEntry(sleepId);
		putSleepEntry(sleepId, sleep);
		form.reset();
	});
	
	form.appendChild(formSubmit);
	document.body.appendChild(form);
	
}

function displayError(message) {
	var dataDiv = document.getElementById('sleepData');
	dataDiv.textContent = message;
}

// function formatDate(date) {
// var year = date.getFullYear();
// var month = date.getMonth() + 1;
// var day = date.getDate();
// var hours = date.getHours();
// var mins = date.getMinutes();
// var meridiem = hours < 12 ? 'am' : 'pm';
// hours = hours % 12;
// hours = hours ? hours : 12;
// minutes = minutes < 10 ? '0' + mins : mins;
// var timeDisplay = month + '/' + day + '/' + year + " " + hours + ':' +
// minutes + ' ' + meridiem;
// return timeDisplay;
// }

function createSleepEntry() {
	console.log('createSleepEntry called');
	let form = document.updatedSleepForm;
	let sleepEntry = {};
	sleepEntry.startSleepTime = form.startSleepTime.value;
	sleepEntry.endSleepTime = form.endSleepTime.value;
	sleepEntry.sleepLocationTemp = form.sleepLocationTemp.value;
	sleepEntry.wakingRestfulness = form.wakingRestfulness.value;
	console.log(sleepEntry);
	postSleepEntry(sleepEntry);
}

function postSleepEntry(sleepEntry) {
	console.log(sleepEntry)
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
		let sleepId = document.createElement('tr');
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
			
		});
		
		sleepRowStart.addEventListener('click', function(e) {
			e.preventDefault();
			getSleep(allSleepEntries[i].startSleepTime);
		});
		
		sleepRowStart.addEventListener('click', function(e) {
			e.preventDefault();
			getSleep(allSleepEntries[i].endSleepTime);
		});
		
		sleepRowTemp.addEventListener('click', function(e) {
			e.preventDefault();
			getSleep(allSleepEntries[i].sleepLocationTemp);
		});
		
		sleepRowRest.addEventListener('click', function(e) {
			e.preventDefault();
			getSleep(allSleepEntries[i].wakingRestfulness);
		});

	}

}

function updateSleepEntry(sleepId) {
	console.log('in updateSleepEntry');
	let form = document.updatedSleepForm;
	let updatedEntry = {};
	updatedEntry.sleepId = form.sleepId.value;
	updatedEntry.startSleepTime = form.startSleepTime.value;
	updatedEntry.endSleepTime = form.endSleepTime.value;
	updatedEntry.sleepLocationTemp = form.sleepLocationTemp.value;
	updatedEntry.wakingRestfulness = form.wakingRestfulness.value;
	updatedEntry.enabled = form.enabled.value;
	console.log(updatedEntry);
	putSleepEntry(sleepId, updatedEntry);
}

function putSleepEntry(sleepId, sleep) {
	console.log('in putSleepEntry');
	console.log(sleepId);
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/sleeplist/' + sleepId);
	xhr.setRequestHeader('Content-type', 'application/json');
	let convertedSleepUpdate = JSON.stringify(sleep);
	console.log(convertedSleepUpdate);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('loud and clear');
			if (xhr.status === 200 || xhr.status === 201) {
				console.log('status good');
				let updatedSleep = JSON.parse(xhr.responseText);
				getAllSleep();
				console.log('should be displayed');
			}
		} 
		else {
			console.log("The update was unsuccessful.");
		}
	};
	xhr.send(convertedSleepUpdate);
}

function deleteSleepEntry(sleepId) {
	console.log('in deleteSleepEntry');
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/sleeplist/' + sleepId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('loud and clear');
			if (xhr.status === 204) {
				console.log('status good');
				populateSleepTable(allSleepEntries);
				console.log('table populated?');
				getAllSleep();
				console.log('should be displayed');
			}
		} else {
			if (xhr.status === 404) {
				displayError('Unknown error deleting sleep entry: '
						+ xhr.status);
			}
		}
	}
}
