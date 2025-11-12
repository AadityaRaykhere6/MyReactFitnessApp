const exerciseData = {
  chest: [
    { name: 'Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', description: 'Lie on a bench and press the weight up from your chest. 3 sets of 8-12 reps.' },
    { name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', description: 'Start in a plank position and lower your body until your chest nearly touches the floor. 3 sets to failure.' },
    { name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Intermediate', description: 'Lie on a bench with dumbbells, and lower them to your sides in a wide arc. 3 sets of 10-15 reps.' }
  ],
  back: [
    { name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Advanced', description: 'Hang from a bar and pull your body up until your chin is over the bar. 3 sets to failure.' },
    { name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', description: 'Lift a loaded barbell off the floor to a standing position, then lower it back down. 4 sets of 5-8 reps.' },
    { name: 'Dumbbell Rows', equipment: 'Dumbbell', difficulty: 'Beginner', description: 'Rest one knee and hand on a bench, and pull a dumbbell up to your chest. 3 sets of 8-12 reps per arm.' }
  ],
  shoulders: [
    { name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', description: 'Press a barbell from your upper chest to overhead. 4 sets of 6-10 reps.' },
    { name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', description: 'Raise dumbbells to your sides up to shoulder height. 3 sets of 12-15 reps.' }
  ],
  biceps: [
    { name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', description: 'Curl a barbell up towards your shoulders, keeping your elbows stationary. 3 sets of 8-12 reps.' },
    { name: 'Hammer Curls', equipment: 'Dumbbell', difficulty: 'Beginner', description: 'Curl two dumbbells with a neutral (hammer) grip. 3 sets of 10-15 reps.' }
  ],
  triceps: [
    { name: 'Tricep Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', description: 'Using parallel bars or a bench, lower your body by bending your elbows. 3 sets to failure.' },
    { name: 'Skull Crushers', equipment: 'Barbell/Dumbbell', difficulty: 'Intermediate', description: 'Lying on a bench, lower a weight towards your forehead by bending your elbows. 3 sets of 10-12 reps.' }
  ],
  quads: [
    { name: 'Squats', equipment: 'Barbell', difficulty: 'Intermediate', description: 'With a barbell on your back, lower your hips as if sitting in a chair. 4 sets of 8-12 reps.' },
    { name: 'Lunges', equipment: 'Dumbbell/Bodyweight', difficulty: 'Beginner', description: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. 3 sets of 10-12 reps per leg.' }
  ],
  hamstrings: [
    { name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', description: 'Hinge at your hips to lower the barbell, keeping your legs relatively straight. 3 sets of 8-12 reps.' }
  ],
  glutes: [
    { name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', description: 'With your upper back on a bench, thrust a barbell up with your hips. 4 sets of 10-15 reps.' }
  ],
  abs: [
    { name: 'Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', description: 'Lie on your back and lift your upper body towards your knees. 3 sets of 15-20 reps.' },
    { name: 'Plank', equipment: 'Bodyweight', difficulty: 'Beginner', description: 'Hold a push-up position, resting on your forearms. 3 sets, hold for 30-60 seconds.' }
  ]
};

export default exerciseData;