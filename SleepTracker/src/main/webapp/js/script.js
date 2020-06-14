window.addEventListener('load', function() {
	init();
});

function init() {
	console.log('script.js loaded');
	getAllSleep();
	document.sleepForm.search.addEventListener('click', function(e) {
		e.preventDefault();
		var sleepId = document.sleepForm.sleepId.value;
		if (!isNaN(sleepId) && sleepId > 0) {
			getSleep(sleepId);
		}
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
	var dataDiv = document.getElementById('sleepData');
	dataDiv.textContent = '';
	let sleepStart = document.createElement('h3');
	sleepStart.textContent = sleep.startSleepTime;
	// sleepStart = formatDate(sleepStart);
	dataDiv.appendChild(sleepStart);

	let sleepEnd = document.createElement('h3');
	sleepEnd.textContent = sleep.endSleepTime;
	dataDiv.appendChild(sleepEnd);

	let sleepLocationTemp = document.createElement('h4');
	sleepLocationTemp.textContent = sleep.sleepLocationTemp;
	dataDiv.appendChild(sleepLocationTemp);

	let restfulness = document.createElement('h4');
	restfulness.textContent = sleep.wakingRestfulness;
	dataDiv.appendChild(restfulness);

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
	let form = document.newSleepForm;
	let sleepEntry = {};
	sleepEntry.startSleeptime = form.startSleepTime.value;
	sleepEntry.endSleepTime = form.endSleepTime.value;
	sleepEntry.sleepLocationTemp = form.sleepLocationTemp.value;
	sleepEntry.wakingRestfulness = form.wakingRestfulness.value;
	console.log(sleepEntry);
	postSleepEntry(sleepEntry);
}

function populateSleepTable(allSleepEntries) {
	console.log('populate table function called');
	let divSleepTable = document.getElementById('sleepListTable')
	let sleepTable = document.createElement('table');
	divSleepTable.appendChild(sleepTable);
	let sleepRow = document.createElement('tr');
	divSleepTable.appendChild(sleepRow);
//	let sleepHeadingMain = document.createElement('th');
//	divSleepTable.appendChild(sleepHeadingMain);
//	divSleepTable.appendChild(sleepRow);
//	sleepHeadingMain.textContent = 'All Sleep Entries';
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

	}

}

function updateSleepEntry(sleepId) {
	console.log('updateSleepEntry called');
	let form = document.updatedSleepForm;
	let updatedEntry = {};
	updatedEntry.id = form.id.value;
	updatedEntry.StartSleepTime = form.startSleepTime.value;
	updatedEntry.endSleepTime = form.endSleepTime.value;
	updatedEntry.sleepLocationTemp = form.sleepLocationTemp.value;
	updatedEntry.wakingRestfulness = form.wakingRestfulness.value;
	console.log('updateSleepEntry(): ');
	console.log(updatedEntry);
	postSleepEntry(updatedEntry);
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

function putSleepEntry(sleepId, sleep) {
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", "api/sleeplist/" + sleepId);
	xhr.setRequestHeader('Content-type', 'application/json');
	let convertedSleepUpdate = JSON.stringify(sleep);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let updatedSleep = JSON.parse(xhr.responseText);
			}
		} else {
			console.log("The update was unsuccessful.");
		}
	};
	xhr.send(convertedSleepUpdate);
}

function deleteSleepEntry(sleepId) {
	let hr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/sleeplist/' + sleepId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
			}
		} else {
			if (xhr.status === 404) {
				displayError('Unknown error deleting sleep entry: '
						+ xhr.status);
			}

		}
	}

}
