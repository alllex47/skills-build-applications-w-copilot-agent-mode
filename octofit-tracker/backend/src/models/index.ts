import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  name: String,
  team: String,
});

const teamSchema = new Schema({
  name: String,
  members: [String],
});

const activitySchema = new Schema({
  user: String,
  type: String,
  duration: Number,
  points: Number,
  date: Date,
});

const leaderboardEntrySchema = new Schema({
  user: String,
  team: String,
  points: Number,
});

const workoutSchema = new Schema({
  name: String,
  description: String,
  difficulty: String,
  duration: Number,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.models.LeaderboardEntry
  || mongoose.model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema, 'workouts');