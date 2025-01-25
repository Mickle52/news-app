export function setDate() {
	const dateFrom = document.getElementById('dates-from')
	const dateTo = document.getElementById('dates-to')
	
	let date = new Date();
	let day = date.getDate()
	let dd = String(day).padStart(2, '0')
	let month = date.getMonth()
	let mm = String(month + 1).padStart(2, '0')
	let yyyy = date.getFullYear()
	let today = `${yyyy}-${mm}-${dd}`
	
	let lastMonthDate = new Date(yyyy, month - 1, day)
	
	let lastMonthDay = String(lastMonthDate.getDate()).padStart(2, '0')
	let lastMonthMonth = String(lastMonthDate.getMonth() + 1).padStart(2, '0')
	let lastMonthYear = lastMonthDate.getFullYear()
	let lastMonthFullDate = `${lastMonthYear}-${lastMonthMonth}-${lastMonthDay}`
	
	dateFrom.setAttribute('min', `${lastMonthFullDate}`)
	dateTo.setAttribute('min', `${lastMonthFullDate}`)
	
	dateFrom.setAttribute('max', `${today}`)
	dateTo.setAttribute('max', `${today}`)
	// console.log(dateFrom.value.length)
	dateFrom.addEventListener('click', () => {
		// dateFrom.showPicker()
		if (dateTo.value.length !== 0) {
			dateFrom.setAttribute('max', `${dateTo.value}`)
			console.log(dateTo.value.length)
		}
	})
	
	dateTo.addEventListener('click', () => {
		// dateTo.showPicker()
		if (dateFrom.value.length !== 0) {
			dateTo.setAttribute('min', `${dateFrom.value}`)
			// dateTo.showPicker()
			console.log(dateFrom.value)
		}
	})
}