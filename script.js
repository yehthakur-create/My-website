// Find all habit checkboxes
const habits = document.querySelectorAll(".habit-check");

// Find progress elements
const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");


// Update the progress system
function updateProgress() {

    // Count completed habits
    let completed = 0;

    habits.forEach(function (habit) {
        if (habit.checked) {
            completed++;
        }
    });

    // Total habits
    const total = habits.length;

    // Calculate percentage
    const percentage = Math.round(
        (completed / total) * 100
    );

    // Update text
    progressText.textContent =
        "Today's Progress: " + completed + " / " + total;

    // Update percentage
    progressPercent.textContent =
        percentage + "%";

    // Update progress bar
    progressFill.style.width =
        percentage + "%";
}


// Load saved data when website opens
habits.forEach(function (habit, index) {

    const savedHabit = localStorage.getItem(
        "habit" + index
    );

    if (savedHabit === "true") {
        habit.checked = true;
    }

});


// Update progress immediately when website opens
updateProgress();


// Save data and update progress when a habit changes
habits.forEach(function (habit, index) {

    habit.addEventListener("change", function () {

        // Save checkbox state
        localStorage.setItem(
            "habit" + index,
            habit.checked
        );

        // Update progress
        updateProgress();

    });

});
