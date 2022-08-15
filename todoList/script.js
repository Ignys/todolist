let todayTasks = 0
let todayTasks_done = 0
let anotherDayTasks = 0
let totalTasks = 0
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
const date = new Date()
nameList()
taskCountDisplay()


function nameList() {
    //
    let day_number = date.getDay();
    let yesterday_number = day_number - 1
    let before_yesterday_number = day_number - 2
    let tomorrow_number = day_number + 1
    let after_tomorrow_number = day_number + 2
    //
    let todayName = week[day_number]
    let yesterdayName = week[yesterday_number]
    let beforeYesterdayName = week[before_yesterday_number]
    let tomorrowName = week[tomorrow_number]
    let afterTomorrowName = week[after_tomorrow_number]
    //
    if (yesterday_number == -1) {
        yesterdayName = 'Saturday';
        beforeYesterdayName = 'Friday';

    } else if (before_yesterday_number == -1) {
        beforeYesterdayName = 'Saturday';
    }
    //
    document.getElementById('todayTitle').innerText = todayName + "'s List"
    document.getElementById('yesterdayTitle').innerText = yesterdayName + "'s List"
    document.getElementById('beforeYesterdayTitle').innerText = beforeYesterdayName + "'s List"
    document.getElementById('tomorrowTitle').innerText = tomorrowName + "'s List"
    document.getElementById('afterTomorrowTitle').innerText = afterTomorrowName + "'s List"
};

function getDay(x) {
    let day_number = date.getDay();
    if (x == 'yesterday' || x == 'y') {
        let yesterday_number = day_number - 1
        if (yesterday_number < 0) {
            yesterday_number += 7
        }
        return yesterday_number
    } else if (x == 'before-yesterday' || x == 'by') {
        let before_yesterday_number = day_number - 2
        if (before_yesterday_number < 0) {
            before_yesterday_number += 7
        }
        return before_yesterday_number
    } else if (x == 'tomorrow' || x == 'to') {
        let tomorrow_number = day_number + 1
        if (tomorrow_number > 6) {
            tomorrow_number -= 7
        }
        return tomorrow_number
    } else if (x == 'after-tomorrow' || x == 'at') {
        let after_tomorrow_number = day_number + 2
        if (after_tomorrow_number > 6) {
            after_tomorrow_number -= 7
        }
        return after_tomorrow_number
    } else if (x == 'today' || x == 't') {
        return date.getDay();
    }

}

function addNewTask(event, day, input) {
    const inputNewTask = document.getElementById(input)
    let taskName = inputNewTask.value
    if (event.key == "Enter") {
        if (taskName !== "") {
            totalTasks++
            if (day == "today") {
                todayTasks++
                $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="td${totalTasks}" onclick="checkTask('t', '${totalTasks}')" onmouseenter="showTrash('tr${totalTasks}')" onmouseleave="hideTrash('tr${totalTasks}')" ><div><input type="checkbox" onclick="checkTask('${totalTasks}')" id="ti${todayTasks}"><span id="tt${totalTasks}" style="margin-left: 3px;">${taskName}</span></div><i id="tr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('t', '${totalTasks}')"></i></div>`);
                setLocaLStorage(totalTasks, convertToOne(date.getDay(), taskName, false, totalTasks))
            } else if (day == "tomorrow") {
                anotherDayTasks++
                $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="tod${totalTasks}" onclick="checkTask('to', '${totalTasks}')" onmouseenter="showTrash('tor${totalTasks}')" onmouseleave="hideTrash('tor${totalTasks}')" ><div><input type="checkbox" onclick="checkTask('${totalTasks}')" id="toi${totalTasks}"><span id="tot${totalTasks}" style="margin-left: 3px;">${taskName}</span></div><i id="tor${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('to', '${totalTasks}')"></i></div>`);
                setLocaLStorage(totalTasks, convertToOne(getDay(day), taskName, false, totalTasks))
            } else if (day == "yesterday") {
                anotherDayTasks++
                $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="yd${totalTasks}" onclick="checkTask('y', '${totalTasks}')" onmouseenter="showTrash('yr${totalTasks}')" onmouseleave="hideTrash('yr${totalTasks}')" ><div><input type="checkbox" onclick="checkTask('${totalTasks}')" id="yi${totalTasks}"><span id="yt${totalTasks}" style="margin-left: 3px;">${taskName}</span></div><i id="yr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('y', '${totalTasks}')"></i></div>`);
                setLocaLStorage(totalTasks, convertToOne(getDay(day), taskName, false, totalTasks))
            } else if (day == "before-yesterday") {
                anotherDayTasks++
                $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  class="todo-task" id="byd${totalTasks}" onclick="checkTask('by', '${totalTasks}')" onmouseenter="showTrash('byr${totalTasks}')" onmouseleave="hideTrash('byr${totalTasks}')" ><div><input type="checkbox" onclick="checkTask('${totalTasks}')" id="byi${totalTasks}"><span id="byt${totalTasks}" style="margin-left: 3px;">${taskName}</span></div><i id="byr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('by', '${totalTasks}')"></i></div>`);
                setLocaLStorage(totalTasks, convertToOne(getDay(day), taskName, false, totalTasks))
            } else if (day == "after-tomorrow") {
                anotherDayTasks++
                $('#' + day + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
                  class="todo-task" id="atd${totalTasks}" onclick="checkTask('at', '${totalTasks}')" onmouseenter="showTrash('atr${totalTasks}')" onmouseleave="hideTrash('atr${totalTasks}')" >
                  <div><input type="checkbox" onclick="checkTask('at', '${totalTasks}')" id="ati${totalTasks}"><span id="att${totalTasks}" style="margin-left: 3px;">${taskName}</span></div>
                  <i id="atr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('at', '${totalTasks}')"></i></div>`);
                setLocaLStorage(totalTasks, convertToOne(getDay(day), taskName, false, totalTasks))
            }
        }
        taskCountDisplay()
        inputNewTask.value = ''
    }
}

function checkTask(day, id, func) {
    const checkbox = document.getElementById(day + 'i' + id)
    const taskText = document.getElementById(day + 't' + id)
    const taskDiv = document.getElementById(day + 'd' + id)
    if (func == 'unmark') {
        try {
            if (checkbox.checked == true) {
                taskText.style = "margin-left: 3px;"
                checkbox.checked = false;
                taskDiv.className = "todo-task"
                todayTasks_done--
            } else {
                return 'error';
            }
        } catch (error) {
            return 'error';
        }
    } else {
        if (checkbox.checked == true) {
            // PARA FAZER
            taskText.style = "margin-left: 3px;"
            checkbox.checked = false;
            taskDiv.className = "todo-task"
            if (day == 't') {
                todayTasks_done--
            }
        } else {
            // FEITO
            taskText.style = "text-decoration: line-through; color: rgba(255,255,255, 0.4); margin-left: 3px; font-style: italic;"
            checkbox.checked = true;
            taskDiv.className = "done-task"
            if (day == 't') {
                todayTasks_done++
            }
        }
    }
    setLocaLStorage(id, convertToOne(getDay(day), taskText.innerText, checkbox.checked, id))
    taskCountDisplay()
};

function taskCountDisplay() {
    const display = document.getElementById('taskCount')
    display.innerText = todayTasks_done + ' de ' + todayTasks
    display.style = ""
    if (todayTasks_done === todayTasks) {
        display.style = "background-color: rgba(0, 150, 0, 0.5)"
    }
}

function removeTask(day, id_number) {
    try {
        const div = document.getElementById(day + 'd' + id_number)
        $(`#${day}b${id_number}`).remove()
        $(`#${day}t${id_number}`).remove()
        if (day == 't') {
            todayTasks--
            if (div.className == "done-task") {
                todayTasks_done--
            }
        } else {
            anotherDayTasks--
        }
        $(`#${day}d${id_number}`).remove()
        localStorage.removeItem(id_number)
        console.log(id_number + " removido no dia " + day)
        totalTasks--
        taskCountDisplay()
    } catch (error) {
        return 'error';
    }
}

function showTrash(id) {
    const trash = document.getElementById(id)
    trash.className = "ph-trash img"
}

function hideTrash(id) {
    const trash = document.getElementById(id)
    trash.className = "ph-trash img invisivel"
}

function createNewTask(text, day_number, id) {
    if (id === 'x') {
        if (getListByDay(day_number) == 'today') {
            todayTasks++
            totalTasks++
            $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  
            class="todo-task" id="td${totalTasks}" onclick="checkTask('t', '${totalTasks}')" onmouseenter="showTrash('tr${totalTasks}')" onmouseleave="hideTrash('tr${totalTasks}')" >
            <div><input type="checkbox" onclick="checkTask('t', '${totalTasks}')" id="ti${totalTasks}"><span id="tt${totalTasks}" style="margin-left: 3px;">${text}</span></div>
            <i id="tr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('t', '${totalTasks}')"></i></div>`);
            console.log(text)
            taskCountDisplay()
        } else if (getListByDay(day_number) == 'yesterday') {
            anotherDayTasks++
            totalTasks++
            $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  
            class="todo-task" id="yd${totalTasks}" onclick="checkTask('y', '${totalTasks}')" onmouseenter="showTrash('yr${totalTasks}')" onmouseleave="hideTrash('yr${totalTasks}')" >
            <div><input type="checkbox" onclick="checkTask('y', '${totalTasks}')" id="yi${totalTasks}"><span id="yt${totalTasks}" style="margin-left: 3px;">${text}</span></div>
            <i id="yr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('y', '${totalTasks}')"></i></div>`)
            console.log(text)
        } else if (getListByDay(day_number) == 'before-yesterday') {
            anotherDayTasks++
            totalTasks++
            $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
              class="todo-task" id="byd${totalTasks}" onclick="checkTask('by', '${totalTasks}')" onmouseenter="showTrash('byr${totalTasks}')" onmouseleave="hideTrash('byr${totalTasks}')" >
              <div><input type="checkbox" onclick="checkTask('by', '${totalTasks}')" id="byi${totalTasks}"><span id="byt${totalTasks}" style="margin-left: 3px;">${text}</span></div>
              <i id="byr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('by', '${totalTasks}')"></i></div>`)
            console.log(text)
        } else if (getListByDay(day_number) == 'tomorrow') {
            anotherDayTasks++
            totalTasks++
            $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
              class="todo-task" id="tod${totalTasks}" onclick="checkTask('to','${totalTasks}')" onmouseenter="showTrash('tor${totalTasks}')" onmouseleave="hideTrash('tor${totalTasks}')" >
              <div><input type="checkbox" onclick="checkTask('to','${totalTasks}')" id="toi${totalTasks}"><span id="tot${totalTasks}" style="margin-left: 3px;">${text}</span></div>
              <i id="tor${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('to', '${totalTasks}')"></i></div>`)
            console.log(text)
        } else if (getListByDay(day_number) == "after-tomorrow") {
            anotherDayTasks++
            totalTasks++
            $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
            class="todo-task" id="atd${totalTasks}" onclick="checkTask('at','${totalTasks}')" onmouseenter="showTrash('atr${totalTasks}')" onmouseleave="hideTrash('atr${totalTasks}')" >
            <div><input type="checkbox" onclick="checkTask('at','${totalTasks}')" id="ati${totalTasks}"><span id="att${totalTasks}" style="margin-left: 3px;">${text}</span></div>
            <i id="atr${totalTasks}" class="ph-trash img invisivel" onclick="removeTask('at', '${totalTasks}')"></i></div>`)
            console.log(text)

        }
        setLocaLStorage(totalTasks, convertToOne(day_number, text, 0, totalTasks))
    } else if (getListByDay(day_number) == 'today') {
        todayTasks++
        totalTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  
        class="todo-task" id="td${id}" onclick="checkTask('t', '${id}')" onmouseenter="showTrash('tr${id}')" onmouseleave="hideTrash('tr${id}')" >
        <div><input type="checkbox" onclick="checkTask('t', '${id}')" id="ti${id}"><span id="tt${id}" style="margin-left: 3px;">${text}</span></div>
        <i id="tr${id}" class="ph-trash img invisivel" onclick="removeTask('t', '${id}')"></i></div>`);
        console.log(text)
        taskCountDisplay()
    } else if (getListByDay(day_number) == 'yesterday') {
        anotherDayTasks++
        totalTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"  
        class="todo-task" id="yd${id}" onclick="checkTask('y', '${id}')" onmouseenter="showTrash('yr${id}')" onmouseleave="hideTrash('yr${id}')" >
        <div><input type="checkbox" onclick="checkTask('y', '${id}')" id="yi${id}"><span id="yt${id}" style="margin-left: 3px;">${text}</span></div>
        <i id="yr${id}" class="ph-trash img invisivel" onclick="removeTask('y', '${id}')"></i></div>`)
        console.log(text)
    } else if (getListByDay(day_number) == 'before-yesterday') {
        anotherDayTasks++
        totalTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
          class="todo-task" id="byd${id}" onclick="checkTask('by', '${id}')" onmouseenter="showTrash('byr${id}')" onmouseleave="hideTrash('byr${id}')" >
          <div><input type="checkbox" onclick="checkTask('by', '${id}')" id="byi${id}"><span id="byt${id}" style="margin-left: 3px;">${text}</span></div>
          <i id="byr${id}" class="ph-trash img invisivel" onclick="removeTask('by', '${id}')"></i></div>`)
        console.log(text)
    } else if (getListByDay(day_number) == 'tomorrow') {
        anotherDayTasks++
        totalTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
          class="todo-task" id="tod${id}" onclick="checkTask('to','${id}')" onmouseenter="showTrash('tor${id}')" onmouseleave="hideTrash('tor${id}')" >
          <div><input type="checkbox" onclick="checkTask('to','${id}')" id="toi${id}"><span id="tot${id}" style="margin-left: 3px;">${text}</span></div>
          <i id="tor${id}" class="ph-trash img invisivel" onclick="removeTask('to', '${id}')"></i></div>`)
        console.log(text)
    } else if (getListByDay(day_number) == "after-tomorrow") {
        anotherDayTasks++
        totalTasks++
        $('#' + getListByDay(day_number) + '-list').append(`<div style="display: flex;justify-content:space-between; align-items: center;"
        class="todo-task" id="atd${id}" onclick="checkTask('at','${id}')" onmouseenter="showTrash('atr${id}')" onmouseleave="hideTrash('atr${id}')" >
        <div><input type="checkbox" onclick="checkTask('at','${id}')" id="ati${id}"><span id="att${id}" style="margin-left: 3px;">${text}</span></div>
        <i id="atr${id}" class="ph-trash img invisivel" onclick="removeTask('at', '${id}')"></i></div>`)
        console.log(text)
    }

}


function getListByDay(x) {
    const today_number = date.getDay();
    const relation = x - today_number
    if (relation == 0) { return 'today'; }
    else if (relation == 1) { return 'tomorrow' }
    else if (relation == 2) { return 'after-tomorrow' }
    else if (relation == -1) { return 'yesterday'; }
    else if (relation == -2) { return 'before-yesterday'; }
    else if (relation == -6) { return 'tomorrow'; }
    else if (relation == -5) { return 'after-tomorrow'; }
    else if (relation == 6) { return 'yesterday'; }
    else if (relation == 5) { return 'before-yesterday'; }
    else { return 'none'; }
}

class Task {
    constructor(dayInNumber, taskName, status, htmlID) {
        this.dayInNumber = dayInNumber;
        this.taskName = taskName;
        this.status = status;
        this.htmlID = htmlID;
    }
}

let mode = 'light'

getLocalStorage()
function getLocalStorage() {
    if (localStorage.getItem('mode') == 'dark' || localStorage.getItem('mode')) {
        const header = document.getElementById('head')
        const section = document.getElementById('lists')
        mode = localStorage.getItem('mode')
        if (mode == 'dark') {
            section.classList = 'dark-theme'
            header.classList = 'dark-theme header'
        } else if (mode == 'light') {
            section.classList = ''
            header.classList = 'header'
        } 
    }
    for (var i = 0; i < localStorage.length; i++) {
        let fodase = localStorage.getItem(localStorage.key(i));
        let array = fodase.split("_")
        if (getListByDay(parseInt(array[0])) !== 'none') {
            createNewTask(array[1], parseInt(array[0]), array[3])
            if (array[2] == 'true') {
                if (getListByDay(array[0]) == 'tomorrow') {
                    checkTask(String(getListByDay(array[0]).charAt(0) + getListByDay(array[0]).charAt(1)), array[3])
                } else if (getListByDay(array[0]) == 'before-yesterday') {
                    checkTask(String(getListByDay(array[0]).charAt(0) + 'y'), array[3])
                } else if (getListByDay(array[0]) == 'after-tomorrow') {
                    checkTask(String(getListByDay(array[0]).charAt(0) + 't'), array[3])
                } else if (getListByDay(array[0]) == 'yesterday' || getListByDay(array[0]) == "today") {
                    checkTask(getListByDay(array[0]).charAt(0), array[3])
                } else {
                    console.log(array)
                }
            }
        }
    }
}

function createDefaultTasks(day) {
    removeAll()
    if (typeof day == typeof 0) {
        $.get(`tasks/${day}.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], day, 'x');
                console.log(aLines[n])
            });
        }, 'text');
    }
    if (day == 'all') {
        $.get(`tasks/0.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 0, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/1.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 1, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/2.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 2, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/3.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 3, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/4.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 4, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/5.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 5, 'x');
                console.log(aLines[n])
            });
        }, 'text');
        $.get(`tasks/6.txt`, function (textData, status) {
            var aLines = textData.split("\n")
            $.each(aLines, function (n, sLine) {
                createNewTask(aLines[n], 6, 'x');
                console.log(aLines[n])
            });
        }, 'text');
    }
}

function convertToOne(day_number, task_name, status, id) {
    return `${day_number}_${task_name}_${status}_${id}`
}

function setLocaLStorage(name, value) {
    localStorage.setItem(String(name), String(value))
}

function unmarkAll() {
    for (var i = 0; i < totalTasks; i++) {
        if (checkTask('t', String(i), 'unmark') === 'none') {
            checkTask('t', String(i), 'unmark')
        }
    }
}

function removeAll() {
    const limit = totalTasks + 1
    for (var i = 0; i < limit; i++) {
        removeTask('t', String(i));
        removeTask('y', String(i));
        removeTask('by', String(i));
        removeTask('to', String(i));
        removeTask('at', String(i))
    }
    todayTasks = 0
    anotherDayTasks = 0
    totalTasks = 0
    todayTasks_done = 0
}

function darkTheme() {
    const header = document.getElementById('head')
    const section = document.getElementById('lists')
    if (mode == 'light') {
        section.classList = 'dark-theme'
        header.classList = 'dark-theme header'
        mode = 'dark'
    } else if (mode == 'dark') {
        section.classList = ''
        header.classList = 'header'
        mode = 'light'
    }
    localStorage.setItem('mode', mode)
}