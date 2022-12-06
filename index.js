let startPage = document.querySelector(".start-button"),
    pollPage = document.querySelector(".poll-wrapper"),
    namePage = document.querySelector(".wrapper-name"),
    reportPage = document.querySelector(".report-wrapper"),
    inputButton = document.querySelector(".input-button"),
    input = document.querySelector(".input")

// polls
quetion = document.querySelector(".quetion"),
    polls = document.querySelector(".polls"),
    poll = document.querySelector(".poll"),
    sn = document.querySelector(".sn"),
    ans = document.querySelector(".ans"),
    statusDiv = document.querySelector(".status"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    select = document.querySelector(".select")

const questions = {
    1: {
        quetion: "Who is God?",
        polls: ["Kabir Ji", "Krishna Ji", "Shiv Ji", "Vishnu Ji"],
        ans: "Kabir Ji",
        select: false,
        userAsn: []
    },
    2: {
        quetion: "Who is TatavDarshi Saint?",
        polls: ["Sant Rampal Ji", "Ashram Ji", "Devkinandan Ji", "Other"],
        ans: "Sant Rampal Ji",
        select: false,
        userAsn: []
    },
    3: {
        quetion: "What is Distance of Satlok from Earth?",
        polls: ["1 Sankh Km", "48 Sankh Km", "16 Sankh Km", "7 Sankh Km"],
        ans: "48 Sankh Km",
        select: false,
        userAsn: []
    },
    4: {
        quetion: "How many Years of Kalyug",
        polls: ["4,32,000", "4,35,000", "43,20,000", "32,87,893"],
        ans: "4,32,000",
        select: false,
        userAsn: []
    },
    5: {
        quetion: "How many Brahmaand of Kaal?",
        polls: ["22", "20", "21", "43"],
        ans: "21",
        select: false,
        userAsn: []
    },
    6: {
        quetion: "Who is the Mother of Shiv Ji?",
        polls: ["Gaytri", "Durga", "Lakshmi", "Other"],
        ans: "Durga",
        select: false,
        userAsn: []
    },
    7: {
        quetion: "Official Website of Sant Rampal Ji?",
        polls: ["jagatgururampalji.org", "jagatgururampalji.com", "jagatgururampal.org", "jagatgururampalji.in"],
        ans: "jagatgururampalji.org",
        select: false,
        userAsn: []
    },
    8: {
        quetion: "How Many Number of Veda?",
        polls: ["4", "5", "6", "3"],
        ans: "5",
        select: false,
        userAsn: []
    },
    9: {
        quetion: "Bodh Diwas of Sant Rampal Ji Maharaj Ji?",
        polls: ["17 Feb", "17 Mar", "8 Sep", "18 June"],
        ans: "17 Feb",
        select: false,
        userAsn: []
    },
    10: {
        quetion: "Who is Sant Rampal Ji?",
        polls: ["Simple Man", "Avtar Of Kabir Ji", "Simple Saint", "Others"],
        ans: "Avtar Of Kabir Ji",
        select: false,
        userAsn: []
    }
}
let userName
let page = 1
let rightAnswer = 0
let wrongAnswer = 0

startPage.addEventListener("click", () => {

    startPage.style.display = "none"
    pollPage.style.display = "none"
    namePage.style.display = "flex"
})

// common data

// input
inputButton.addEventListener("click", function (e) {

    e.preventDefault()

    const name = input.value
    if (!name) return

    userName = name
    startPage.style.display = "none"
    namePage.style.display = "none"
    pollPage.style.display = "flex"
})

// prev poll
prev.addEventListener("click", function () {

    if (page === 1) return

    page = page - 1
    polls.innerHTML = ""
    run = 0
    statusDiv.style.display = "none"
    render()
})

// next
next.addEventListener("click", function () {

    if (page === 10) {
        pollPage.style.display = "none"
        reportPage.style.display = "flex"
        renderReport()
        return
    }

    if (!questions[page].select) return

    page = page + 1
    statusDiv.style.display = "none"
    run = 0
    polls.innerHTML = ""
    render()
})

// current page
function currentPage() {

    const currentData = questions[page]
    const data = {
        quetion: currentData.quetion,
        polls: currentData.polls,
        ans: currentData.ans,
        select: currentData.select,
        userAns: currentData.userAsn,
    }

    return data
}

function render() {

    const currentData = currentPage()

    // quetion
    quetion.textContent = `Q. ${page} - ${currentData.quetion}`

    // polls
    currentData.polls.forEach((poll, i) => {

        const pollDiv = document.createElement("div")
        pollDiv.classList.add("poll")

        let html = `
                <span class="sn">${i + 1}</span>
                <span class="ans">${poll}</span>
                <span id="${i + 1}" onClick="setAns(this.id)" class="select"></span>
        `

        pollDiv.innerHTML = html
        polls.appendChild(pollDiv)
    });

    if (page === 1) {
        prev.style.display = "none"
    } else if (page === 10) {
        prev.style.display = "none"
        next.textContent = "View Report"
    } else {
        prev.style.display = "flex"
    }

    if (currentData.userAns.length > 0) {
        showAns(currentData.userAns[0], currentData.userAns[1], currentData.userAns[2])
    }
}

function setAns(id) {


    if (questions[page].select) return

    id = id - 1
    const rightAns = questions[page].ans
    const userAns = questions[page].polls[id]


    let message
    questions[page].select = true

    if (rightAns === userAns) {
        message = "You are Great 🤩"
        rightAnswer = rightAnswer + 1
    } else {
        message = `Opps..😞 Answer is ${rightAns}`
        wrongAnswer = wrongAnswer + 1
    }
    questions[page].userAsn = [id + 1, questions[page].polls.indexOf(rightAns) + 1, message]
    return showAns(id + 1, questions[page].polls.indexOf(rightAns) + 1, message)
}

function showAns(id1, id2, message) {

    const activeItem = document.getElementById(id1)
    const rightItem = document.getElementById(id2)

    // add class
    activeItem.classList.add("active")
    rightItem.classList.add("right")

    // status
    statusDiv.style.display = "flex"
    statusDiv.textContent = message
}

render()


// report page function
let reportStatus = document.querySelector(".report-status"),
    pQuetion = document.querySelector(".p-quetion"),
    title = document.querySelector(".title"),
    rightQuetion = document.querySelector(".right-ans"),
    wrongQuetion = document.querySelector(".wrong-ans"),
    per = document.querySelector(".per")

function renderReport() {

    title.textContent = userName + " Your Report 👨‍💼"
    let statusReport

    if (rightAnswer < 5) {
        statusReport = `You are Lazy 😶`
    } else {
        statusReport = `You are Ginius 👽`
    }

    reportStatus.textContent = statusReport
    pQuetion.textContent = 10
    rightQuetion.textContent = rightAnswer
    wrongQuetion.textContent = wrongAnswer
    per.textContent = rightAnswer * 100 / 10 + "%"

}

