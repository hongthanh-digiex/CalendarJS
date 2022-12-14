let table = document.querySelector('.tableCalendarContent')
let month = document.querySelector('.month')
let day = document.querySelector('.day')
let dayOfWeek = document.querySelector('.dayOfWeek')
let headDay = document.querySelector('.headDay')

let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let prevYear = document.querySelector('.prevYear')
let nextYear = document.querySelector('.nextYear')

let arrayDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let arrayMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

let today = new Date()
let currDay = today.getDay()
let currDate = today.getDate()
let currMonth = today.getMonth()
let currYear = today.getFullYear()

// Click date
const clickDate = (cells) => {
    cells.forEach((cell) => {
        cell.addEventListener('click', function () {
            cells.forEach((cell) => {
                cell.classList.remove('active')
                this.classList.add('active')
            })
            currDate = cell.innerHTML
            currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
            renderDate()
        })
    })
}

//InnerHTML Date
const renderDate = () => {
    month.innerHTML = `${arrayMonth[currMonth]} ${currYear}`
    day.innerHTML = currDate
    dayOfWeek.innerHTML = arrayDayOfWeek[currDay]
}
renderDate()

//render dayOfWeek
const renderHeadDay = () => {
    let headDayContent = ''
    arrayDayOfWeek.forEach((ele) => {
        headDayContent += `<th>${ele}</th>`
    })
    headDay.innerHTML = headDayContent
}
renderHeadDay()

// render table content
const renderTable = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay()

    let dateContent = ''
    let date = 1
    for (let i = 0; i <= 6; i++) {
        dateContent += '<tr>'
        if (i === 0) {
            for (let j = firstDayofMonth; j > 0; j--) {
                dateContent += '<td></td>'
            }
            for (let j = 1; j <= 7 - firstDayofMonth; j++) {
                dateContent += `<td class="cell">${date}</td>`
                date++
            }
            dateContent += '</tr>'
        }

        for (let j = 1; j <= 7 && date <= lastDateofMonth; j++) {
            dateContent += `<td class="cell">${date}</td>`
            date++
        }

        dateContent += '</tr>'
    }
    table.innerHTML = dateContent

    let cells = document.querySelectorAll('.cell')

    cells.forEach((cell) => {
        if (cell.innerHTML == currDate) {
            cell.classList.add('active')
        }
    })

    clickDate(cells)
}
renderTable()

// Click month
next.addEventListener('click', () => {
    if (currMonth !== 11) {
        currMonth++
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    } else {
        currMonth = 0
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    }
    renderTable()
    renderDate()
})

prev.addEventListener('click', () => {
    if (currMonth !== 0) {
        currMonth--
    } else {
        currMonth = 11
    }
    renderTable()
    renderDate()
})

// Click year
nextYear.addEventListener('click', () => {
    if (currYear !== 11) {
        currYear++
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    } else {
        currYear = 0
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    }
    renderTable()
    renderDate()
})

prevYear.addEventListener('click', () => {
    if (currYear !== 0) {
        currYear--
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    } else {
        currYear = 11
        currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()
    }
    renderTable()
    renderDate()
})

//Click day
const renderSelect = (end, id, currNumber) => {
    let data = ''
    for (let i = 1; i <= end; i++) {
        data += `<option value="${i}" ${i == currNumber ? 'selected' : ''}>${i}</option>`
    }
    document.querySelector(id).innerHTML = data
}

renderSelect(12, '#selectMonth', currMonth + 1) //renderMonth
renderSelect(new Date(currYear, currMonth + 1, 0).getDate(), '#selectDate', currDate) //renderDate

document.querySelector('#year').setAttribute('value', currYear)

document.querySelector('#selectMonth').addEventListener('change', (event) => {
    let selectedMonth = event.target.value
    let selectedYear = document.querySelector('#year').value
    let lastDateofSelectedMonth = new Date(selectedYear, selectedMonth, 0).getDate()
    renderSelect(lastDateofSelectedMonth, '#selectDate', currDate) //renderDate
})
document.querySelector('#year').addEventListener('blur', (event) => {
    let selectedYear = event.target.value
    let selectedMonth = document.querySelector('#selectMonth').value
    let lastDateofSelectedMonth = new Date(selectedYear, selectedMonth, 0).getDate()
    renderSelect(lastDateofSelectedMonth, '#selectDate', currDate) //renderDate
})

// Click Ok
const selectFullDate = () => {
    currDate = document.querySelector('#selectDate').value
    currMonth = document.querySelector('#selectMonth').value - 1
    currYear = document.querySelector('#year').value
    currDay = new Date(`${currMonth + 1} ${currDate}, ${currYear}`).getDay()

    renderTable()
    renderDate()
}
