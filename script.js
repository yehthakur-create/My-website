const habits = document.querySelectorAll(".habit");

habits.forEach(habit => {
  habit.addEventListener("click", () => {
    habit.classList.toggle("completed");
  });
});
console.log("My NEET Habit Tracker is working!");
