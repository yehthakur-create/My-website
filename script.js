// ========================================
// NEET LIFE OS
// Version 1.0
// ========================================


// ---------- DATE ----------

const today = new Date();

const dateKey =
    today.toISOString()
        .split("T")[0];


// Show today's date

document.getElementById(
    "today-date"
).textContent =
    today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


// ---------- STORAGE KEYS ----------

const dailyDataKey =
    "neet-data-" + dateKey;

const streakKey =
    "neet-streak-data";


// ---------- DEFAULT HABITS ----------

const defaultHabits = [

    "📚 Study Biology",

    "⚛️ Study Physics",

    "🧪 Study Chemistry",

    "📝 Practice PYQs",

    "📵 Avoid Unnecessary Phone Use",

    "😴 Sleep On Time"

];


// ---------- APP DATA ----------

let appData = {

    habits: [],

    tasks: [],

    physics: 0,

    chemistry: 0,

    biology: 0,

    questions: 0

};


// ---------- LOAD DATA ----------

function loadData() {

    const saved =
        localStorage.getItem(
            dailyDataKey
        );


    if (saved) {

        appData =
            JSON.parse(saved);

    } else {

        appData.habits =
            defaultHabits.map(
                function (name) {

                    return {

                        name: name,

                        completed: false

                    };

                }
            );

    }

}


// ---------- SAVE DATA ----------

function saveData() {

    localStorage.setItem(

        dailyDataKey,

        JSON.stringify(
            appData
        )

    );

}


// ---------- RENDER HABITS ----------

function renderHabits() {

    const list =
        document.getElementById(
            "daily-habit-list"
        );


    list.innerHTML = "";


    appData.habits.forEach(

        function (
            habit,
            index
        ) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "habit";


            if (
                habit.completed
            ) {

                item.classList.add(
                    "completed"
                );

            }


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                habit.name;


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.checked =
                habit.completed;


            checkbox.addEventListener(

                "change",

                function () {

                    appData
                        .habits[
                            index
                        ]
                        .completed =
                            checkbox.checked;


                    saveData();

                    renderHabits();

                    updateProgress();

                }

            );


            item.appendChild(
                text
            );

            item.appendChild(
                checkbox
            );


            list.appendChild(
                item
            );

        }

    );

}


// ---------- RENDER TASKS ----------

function renderTasks() {

    const list =
        document.getElementById(
            "task-list"
        );


    list.innerHTML = "";


    appData.tasks.forEach(

        function (
            task,
            index
        ) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "habit";


            if (
                task.completed
            ) {

                item.classList.add(
                    "completed"
                );

            }


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                task.name;


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.checked =
                task.completed;


            checkbox.addEventListener(

                "change",

                function () {

                    appData
                        .tasks[
                            index
                        ]
                        .completed =
                            checkbox.checked;


                    saveData();

                    renderTasks();

                    updateProgress();

                }

            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "×";


            deleteButton.className =
                "delete-button";


            deleteButton.addEventListener(

                "click",

                function () {

                    appData.tasks.splice(
                        index,
                        1
                    );


                    saveData();

                    renderTasks();

                    updateProgress();

                }

            );


            item.appendChild(
                text
            );

            item.appendChild(
                checkbox
            );

            item.appendChild(
                deleteButton
            );


            list.appendChild(
                item
            );

        }

    );

}


// ---------- ADD TASK ----------

function addTask() {

    const input =
        document.getElementById(
            "task-input"
        );


    const name =
        input.value.trim();


    if (
        name === ""
    ) {

        return;

    }


    appData.tasks.push({

        name: name,

        completed: false

    });


    input.value = "";


    saveData();

    renderTasks();

    updateProgress();

}


document
    .getElementById(
        "add-task-button"
    )
    .addEventListener(

        "click",

        addTask

    );


document
    .getElementById(
        "task-input"
    )
    .addEventListener(

        "keydown",

        function (
            event
        ) {

            if (
                event.key ===
                "Enter"
            ) {

                addTask();

            }

        }

    );


// ---------- PROGRESS ----------

function updateProgress() {

    const allItems = [

        ...appData.habits,

        ...appData.tasks

    ];


    const total =
        allItems.length;


    const completed =
        allItems.filter(

            function (
                item
            ) {

                return item.completed;

            }

        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (
                    completed /
                    total
                ) * 100
            );


    document.getElementById(
        "progress-text"
    ).textContent =
        completed +
        " / " +
        total +
        " completed";


    document.getElementById(
        "progress-percent"
    ).textContent =
        percentage +
        "%";


    document.getElementById(
        "progress-fill"
    ).style.width =
        percentage +
        "%";


    updateStreak(
        percentage
    );

}


// ---------- STUDY INPUTS ----------

const studyInputs = [

    "physics-hours",

    "chemistry-hours",

    "biology-hours",

    "questions"

];


function loadStudyInputs() {

    document.getElementById(
        "physics-hours"
    ).value =
        appData.physics || "";


    document.getElementById(
        "chemistry-hours"
    ).value =
        appData.chemistry || "";


    document.getElementById(
        "biology-hours"
    ).value =
        appData.biology || "";


    document.getElementById(
        "questions"
    ).value =
        appData.questions || "";


    updateStudySummary();

}


studyInputs.forEach(

    function (
        id
    ) {

        document
            .getElementById(
                id
            )
            .addEventListener(

                "input",

                function () {

                    appData.physics =
                        Number(
                            document
                                .getElementById(
                                    "physics-hours"
                                )
                                .value
                        ) || 0;


                    appData.chemistry =
                        Number(
                            document
                                .getElementById(
                                    "chemistry-hours"
                                )
                                .value
                        ) || 0;


                    appData.biology =
                        Number(
                            document
                                .getElementById(
                                    "biology-hours"
                                )
                                .value
                        ) || 0;


                    appData.questions =
                        Number(
                            document
                                .getElementById(
                                    "questions"
                                )
                                .value
                        ) || 0;


                    saveData();

                    updateStudySummary();

                }

            );

    }

);


// ---------- STUDY SUMMARY ----------

function updateStudySummary() {

    const totalHours =

        appData.physics +

        appData.chemistry +

        appData.biology;


    document.getElementById(
        "total-hours"
    ).textContent =
        totalHours +
        " Hours";


    document.getElementById(
        "total-questions"
    ).textContent =
        appData.questions;


    document.getElementById(
        "physics-display"
    ).textContent =
        appData.physics +
        "h";


    document.getElementById(
        "chemistry-display"
    ).textContent =
        appData.chemistry +
        "h";


    document.getElementById(
        "biology-display"
    ).textContent =
        appData.biology +
        "h";


    // Maximum visual goal = 10 hours

    document.getElementById(
        "physics-bar"
    ).style.width =
        Math.min(
            appData.physics * 10,
            100
        ) +
        "%";


    document.getElementById(
        "chemistry-bar"
    ).style.width =
        Math.min(
            appData.chemistry * 10,
            100
        ) +
        "%";


    document.getElementById(
        "biology-bar"
    ).style.width =
        Math.min(
            appData.biology * 10,
            100
        ) +
        "%";

}


// ---------- STREAK ----------

function updateStreak(
    progress
) {

    let streakData =
        JSON.parse(

            localStorage.getItem(
                streakKey
            )

        ) || {

            streak: 0,

            lastDate: ""

        };


    // Count a successful day
    // when at least 70% is completed

    if (
        progress >= 70 &&
        streakData.lastDate !==
        dateKey
    ) {

        streakData.streak++;

        streakData.lastDate =
            dateKey;


        localStorage.setItem(

            streakKey,

            JSON.stringify(
                streakData
            )

        );

    }


    document.getElementById(
        "streak"
    ).textContent =
        streakData.streak +
        " Days";

}


// ---------- COUNTDOWN ----------


// Change this date later
// when the official NEET date is known

const examDate =
    new Date(
        "2027-05-02"
    );


const daysRemaining =
    Math.ceil(

        (
            examDate -
            today
        )

        /

        (
            1000 *
            60 *
            60 *
            24
        )

    );


document.getElementById(
    "countdown"
).textContent =
    Math.max(
        0,
        daysRemaining
    ) +
    " Days";


// ---------- START APP ----------

loadData();

renderHabits();

renderTasks();

loadStudyInputs();

updateProgress();
