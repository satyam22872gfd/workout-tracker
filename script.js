document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const addExerciseButton = document.getElementById('addExercise');
    const workoutContainer = document.getElementById('workoutContainer');

    let exercises = [];

    loadWorkouts();

    addExerciseButton.addEventListener('click', () => {
        const exerciseName = document.getElementById('exerciseName').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const weight = document.getElementById('weight').value;

        if (exerciseName && sets && reps && weight) {
            exercises.push({ exerciseName, sets, reps, weight });
            alert('Exercise added!');
        } else {
            alert('Please fill in all exercise fields.');
        }
    });

    workoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const workoutName = document.getElementById('workoutName').value;
        const workoutDate = document.getElementById('workoutDate').value;

        if (workoutName && workoutDate) {
            const workout = {
                workoutName,
                workoutDate,
                exercises
            };

            saveWorkout(workout); 
            displayWorkout(workout); 

            exercises = [];  
            workoutForm.reset();
        } else {
            alert('Please fill in all workout fields.');
        }
    });

    function displayWorkout(workout) {
        const workoutDiv = document.createElement('div');
        workoutDiv.classList.add('workout');

        let workoutHTML = `<h3>${workout.workoutName} - ${workout.workoutDate}</h3><ul>`;
        workout.exercises.forEach(exercise => {
            workoutHTML += `<li>${exercise.exerciseName} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg</li>`;
        });
        workoutHTML += '</ul>';

        workoutDiv.innerHTML = workoutHTML;
        workoutContainer.appendChild(workoutDiv);
    }

    function saveWorkout(workout) {
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    function loadWorkouts() {
        const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.forEach(displayWorkout);
    }
});




const firebaseConfig = {
    apiKey: "AIzaSyAyVXPQNFmAV38TxiHlEWSoFFmcjzAdUCY",
    authDomain: "fit-log-dbcf6.firebaseapp.com",
    databaseURL: "https://fit-log-dbcf6-default-rtdb.firebaseio.com",
    projectId: "fit-log-dbcf6",
    storageBucket: "fit-log-dbcf6.firebasestorage.app",
    messagingSenderId: "886082052889",
    appId: "1:886082052889:web:d75494882ebb8255615b88",
    measurementId: "G-W66E5TVPXW"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var password = getElementVal("password");
    saveMessages(name, password);
  
 
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, password) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      password: password,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };



function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var password = getElementVal("password");

    saveMessages(name, password);

    // Redirect to index.html after saving
    window.location.href = "index.html";

    document.getElementById("contactForm").reset();
}
