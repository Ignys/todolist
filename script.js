let todayTasks = 0
let todayTasks_done = 0
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
const date = new Date

function getDay() {
    let day_number = date.getDay();
    let yesterday_number = day_number - 1
    let before_yesterday_number = day_number - 2
    let tomorrow_number = day_number + 1
    let after_tomorrow_number = day_number + 2
    let todayName = week[day_number]
    let yesterdayName = week[yesterday_number]
    let beforeYesterdayName = week[before_yesterday_number]
    let tomorrowName = week[tomorrow_number]
    let afterTomorrowName = week[after_tomorrow_number]
    if (yesterday_number == -1) {
        yesterdayName = 'Saturday';
        beforeYesterdayName = 'Friday';

    } else if (before_yesterday_number == -1) {
        beforeYesterdayName = 'Saturday';

    }
    document.getElementById('todayTitle').innerText = todayName + "'s List"
    document.getElementById('yesterdayTitle').innerText = yesterdayName + "'s List"
    document.getElementById('beforeYesterdayTitle').innerText = beforeYesterdayName + "'s List"
    document.getElementById('tomorrowTitle').innerText = tomorrowName + "'s List"
    document.getElementById('afterTomorrowTitle').innerText = afterTomorrowName + "'s List"
};

function addNewTask(event, day, id) {
    const inputNewTask = document.getElementById(id)
    let taskName = inputNewTask.value
    if (event.key == "Enter") {
        if (taskName !== "") {
            todayTasks++
            $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="td${todayTasks}" onclick="checkTask('${todayTasks}')" onmouseenter="showTrash('${todayTasks}')" onmouseleave="hideTrash('${todayTasks}')" ><div><input type="checkbox" onclick="checkTask('${todayTasks}')" id="tb${todayTasks}"><span id="tt${todayTasks}" style="margin-left: 3px;">${taskName}</span></div><i id="tr${todayTasks}" class="ph-trash img invisivel" onclick="removeTask('${todayTasks}')"></i></div>`);
            inputNewTask.value = ''
        }
        taskCountDisplay()
    }
}

function checkTask(id) {
    const checkbox = document.getElementById('tb' + id)
    const taskText = document.getElementById('tt' + id)
    const taskDiv = document.getElementById('td' + id)
    if (checkbox.checked == true) {
        // PARA FAZER
        taskText.style = "margin-left: 3px;"
        checkbox.checked = false;
        taskDiv.className = "todo-task"
        todayTasks_done--
    } else {
        // FEITO
        taskText.style = "text-decoration: line-through; color: rgba(255,255,255, 0.4); margin-left: 3px; font-style: italic;"
        checkbox.checked = true;
        taskDiv.className = "done-task"
        todayTasks_done++
    }
    taskCountDisplay()
}

function taskCountDisplay() {
    const display = document.getElementById('taskCount')
    display.innerText = todayTasks_done + ' de ' + todayTasks
    display.style = ""
    if (todayTasks_done === todayTasks) {
        display.style = "background-color: rgba(0, 150, 0, 0.5)"
    }
}

function removeTask(id) {
    const div = document.getElementById('td' + id)
    $('#tb' + id).remove()
    $('#tt' + id).remove()
    $('#td' + id).remove()
    todayTasks--
    if (div.className == "done-task") {
        todayTasks_done--
    }
    taskCountDisplay()
}

function showTrash(id) {
    const trash = document.getElementById('tr' + id)
    trash.className = "ph-trash img"
}

function hideTrash(id) {
    const trash = document.getElementById('tr' + id)
    trash.className = "ph-trash img invisivel"
}

function createNewTask(text, day_number) {
    getListByDay(day_number)
    if (getListByDay(day_number) == 'today') {
        todayTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="td${todayTasks}" onclick="checkTask('${todayTasks}')" onmouseenter="showTrash('${todayTasks}')" onmouseleave="hideTrash('${todayTasks}')" ><div><input type="checkbox" onclick="checkTask('${todayTasks}')" id="tb${todayTasks}"><span id="tt${todayTasks}" style="margin-left: 3px;">${text}</span></div><i id="tr${todayTasks}" class="ph-trash img invisivel" onclick="removeTask('${todayTasks}')"></i></div>`);
        console.log(text)
        taskCountDisplay()
    } else if (getListByDay(day_number) !== 'none') {
        $('#' + getListByDay(day_number) + '-list').append(`<div class="todo-task"><input type="checkbox"><span style="margin-left: 3px;">${text}</span></div>`)
    }
}

function getListByDay(x) {
    const today_number = date.getDay();
    const relation = x - today_number
    console.log(relation + '=' + x + "+" + today_number)
    if (relation == 0) {
        console.log('x is today')
        return 'today';
    } else if (relation == 1) {
        console.log('x is tomorrow')
        return 'tomorrow'
    } else if (relation == 2) {
        console.log('x is after-tomorrow')
        return 'after-tomorrow'
    } else if (relation == -1) {
        console.log('x is yesterday')
        return 'yesterday';
    } else if (relation == -2) {
        console.log('x is before-yesterday')
        return 'before-yesterday';
    } else if (relation == -6) {
        console.log('x is tomorrow')
        return 'tomorrow';
    } else if (relation == -5) {
        console.log('x is after-tomorrow')
        return 'after-tomorrow';
    } else if (relation == 6) {
        console.log('x is yesterday')
        return 'yesterday';
    } else if (relation == 5) {
        console.log('x is before-yesterday')
        return 'before-yesterday';
    } else {
        console.log('x is none')
        return 'none';

    }
}

$.get('tasks/monday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>');
        createNewTask(aLines[n], 1);
    });;
}, 'text');

$.get('tasks/friday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 5);      // this also work
    });;
}, 'text');

$.get('tasks/tuesday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 2);      // this also work
    });;
}, 'text');

$.get('tasks/wednesday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 3);      // this also work
    });;
}, 'text');

$.get('tasks/sunday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 0);      // this also work
    });;
}, 'text');

$.get('tasks/thursday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 4);      // this also work
    });;
}, 'text');

$.get('tasks/saturday-tasks.txt', function (textData, status) {
    var aLines = textData.split("\n")
    $.each(aLines, function (n, sLine) {
        $('#textFromFile').append('<div>' + sLine + '</div>'); // ?????
        createNewTask(aLines[n], 6);      // this also work
    });;
}, 'text');

var total = 0;
$('input[name^="Amount"]').each(function () {
    total += parseInt(this.value, 10) || 0;
    if (this.value.length === 0) this.value = 0;
});


