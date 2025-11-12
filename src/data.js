export const workoutData = [
  {
    id: 1,
    level: 'Beginner',
    title: 'Foundation First',
    description: 'Start your fitness journey with basic movements and build a strong foundation.',
    icon: 'fa-solid fa-person-walking',
    color: '#32CD32',
    exercises: [
      { name: 'Jumping Jacks', sets: 3, reps: '20 reps', videoUrl: '/videos/jumping-jacks.mp4' },
      { name: 'Bodyweight Squats', sets: 3, reps: '15 reps', videoUrl: '/videos/squats.mp4' },
      { name: 'Push-ups (on knees)', sets: 3, reps: '10 reps', videoUrl: '/videos/pushups.mp4' },
      { name: 'Plank', sets: 3, reps: '30 seconds', videoUrl: '/videos/plank.mp4' },
    ]
  },
  {
    id: 2,
    level: 'Intermediate',
    title: 'Challenge Yourself',
    description: 'Increase the intensity and add more complex exercises to push your limits.',
    icon: 'fa-solid fa-dumbbell',
    color: '#FFD700',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: '8 reps', videoUrl: '/videos/pullups.mp4' },
      { name: 'Dumbbell Lunges', sets: 3, reps: '12 reps per leg', videoUrl: '/videos/lunges.mp4' },
      { name: 'Standard Push-ups', sets: 4, reps: '15 reps', videoUrl: '/videos/pushups.mp4' },
      { name: 'Russian Twists', sets: 3, reps: '20 reps', videoUrl: '/videos/russian-twists.mp4' },
    ]
  },
  {
    id: 3,
    level: 'Advanced',
    title: 'Peak Performance',
    description: 'High-intensity workouts designed for maximum strength and endurance.',
    icon: 'fa-solid fa-fire',
    color: '#FF4500',
    exercises: [
      { name: 'Burpees', sets: 4, reps: '15 reps', videoUrl: '/videos/burpees.mp4' },
      { name: 'Muscle-ups', sets: 4, reps: '5 reps', videoUrl: '/videos/muscleups.mp4' },
      { name: 'Pistol Squats', sets: 3, reps: '8 reps per leg', videoUrl: '/videos/pistol-squats.mp4' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '15 reps', videoUrl: '/videos/leg-raises.mp4' },
    ]
  },
];