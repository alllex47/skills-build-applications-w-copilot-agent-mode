import { Router, type RequestHandler } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

function listDocuments(model: Model<any>, sort?: Record<string, 1 | -1>): RequestHandler {
  return async (_request, response, next) => {
    try {
      let query = model.find().lean();
      if (sort) {
        query = query.sort(sort);
      }
      response.json(await query.exec());
    } catch (error) {
      next(error);
    }
  };
}

router.get('/users/', listDocuments(User));
router.get('/teams/', listDocuments(Team));
router.get('/activities/', listDocuments(Activity));
router.get('/leaderboard/', listDocuments(LeaderboardEntry, { points: -1 }));
router.get('/workouts/', listDocuments(Workout));

export default router;