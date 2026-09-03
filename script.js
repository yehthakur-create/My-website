// Find all habit checkboxes
const habits = document.querySelectorAll(".habit-check");

// Load saved habit data when the website opens
habits.forEach((habit, index) => {

    // Get the saved value for this habit
    const savedHabit = localStorage.getItem("habit" + index);

    // If the saved value is true, tick the checkbox
    if (savedHabit === "true") {
        habit.checked = true;
    }


    // Save the habit whenever the checkbox changes
    habit.addEventListener("change", function () {

        localStorage.setItem(
            "habit" + index,
            habit.checked
        );

    });

});
