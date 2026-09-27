import mongoose, { type Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  { id: '650000000000000000000001', username: 'maya.chen', email: 'maya.chen@example.com', name: 'Maya Chen', team: 'Trail Blazers' },
  { id: '650000000000000000000002', username: 'leo.martin', email: 'leo.martin@example.com', name: 'Leo Martin', team: 'Trail Blazers' },
  { id: '650000000000000000000003', username: 'amina.patel', email: 'amina.patel@example.com', name: 'Amina Patel', team: 'Pulse Collective' },
  { id: '650000000000000000000004', username: 'noah.williams', email: 'noah.williams@example.com', name: 'Noah Williams', team: 'Pulse Collective' },
];

const teams = [
  { id: '650000000000000000000011', name: 'Trail Blazers', members: ['maya.chen', 'leo.martin'] },
  { id: '650000000000000000000012', name: 'Pulse Collective', members: ['amina.patel', 'noah.williams'] },
];

const activities = [
  { id: '650000000000000000000021', user: 'maya.chen', type: 'running', duration: 32, points: 160, date: new Date('2026-09-24T07:30:00.000Z') },
  { id: '650000000000000000000022', user: 'leo.martin', type: 'cycling', duration: 45, points: 180, date: new Date('2026-09-24T17:15:00.000Z') },
  { id: '650000000000000000000023', user: 'amina.patel', type: 'strength', duration: 40, points: 160, date: new Date('2026-09-25T08:00:00.000Z') },
  { id: '650000000000000000000024', user: 'noah.williams', type: 'walking', duration: 50, points: 125, date: new Date('2026-09-25T12:20:00.000Z') },
  { id: '650000000000000000000025', user: 'maya.chen', type: 'yoga', duration: 25, points: 75, date: new Date('2026-09-26T09:00:00.000Z') },
];

const leaderboard = [
  { id: '650000000000000000000031', user: 'maya.chen', team: 'Trail Blazers', points: 235 },
  { id: '650000000000000000000032', user: 'leo.martin', team: 'Trail Blazers', points: 180 },
  { id: '650000000000000000000033', user: 'amina.patel', team: 'Pulse Collective', points: 160 },
  { id: '650000000000000000000034', user: 'noah.williams', team: 'Pulse Collective', points: 125 },
];

const workouts = [
  { id: '650000000000000000000041', name: 'Steady State Run', description: 'A conversational-pace outdoor run to build aerobic endurance.', difficulty: 'beginner', duration: 30 },
  { id: '650000000000000000000042', name: 'Full-Body Strength', description: 'A balanced circuit of bodyweight squats, push-ups, hinges, and planks.', difficulty: 'intermediate', duration: 35 },
  { id: '650000000000000000000043', name: 'Mobility Reset', description: 'Gentle hip, shoulder, and spine mobility with relaxed breathing.', difficulty: 'beginner', duration: 20 },
  { id: '650000000000000000000044', name: 'Hill Intervals', description: 'Short uphill efforts with easy recovery walks between repeats.', difficulty: 'advanced', duration: 40 },
];

async function upsertSeedRecords(
  model: Model<any>,
  records: Array<{ id: string; [key: string]: unknown }>,
) {
  const operations = records.map(({ id, ...record }) => ({
    updateOne: {
      filter: { _id: new mongoose.Types.ObjectId(id) },
      update: { $set: record },
      upsert: true,
    },
  }));
  await model.bulkWrite(operations);
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await upsertSeedRecords(User, users);
    await upsertSeedRecords(Team, teams);
    await upsertSeedRecords(Activity, activities);
    await upsertSeedRecords(LeaderboardEntry, leaderboard);
    await upsertSeedRecords(Workout, workouts);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
