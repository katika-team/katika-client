# TTT Integration Quick Checklist

## For Database/Supabase Developer

This is a quick reference checklist for integrating the Tic-Tac-Toe game. For detailed instructions, see `TTT_INTEGRATION_GUIDE.md`.

---

## Phase 1: Git Integration (30 minutes)

### Branch Setup
- [ ] Fetch all remote branches: `git fetch --all`
- [ ] Checkout main app branch: `git checkout main`
- [ ] Create integration branch: `git checkout -b ttt-integration`
- [ ] Pull latest changes: `git pull origin main`

### Get TTT Files
Choose ONE method:

**Method A: Full Merge (Recommended)**
- [ ] Merge games branch: `git merge origin/games`
- [ ] Resolve any conflicts
- [ ] Commit merge: `git commit -m "Merge TTT game from games branch"`

**Method B: Manual Copy**
- [ ] Checkout games branch: `git checkout games`
- [ ] Copy these folders/files:
  - [ ] `app/TTT/` (entire folder)
  - [ ] `app/component/TictactoeBoard.tsx`
  - [ ] `app/components/SessionProvider.tsx`
  - [ ] `app/hooks/useTictactoeGame.ts`
  - [ ] `assets/ttt/` (entire folder)
- [ ] Return to integration branch: `git checkout ttt-integration`
- [ ] Paste copied files
- [ ] Stage and commit: `git add . && git commit -m "Add TTT game files"`

---

## Phase 2: Dependencies (15 minutes)

### Install Packages
- [ ] Run: `npm install` or `pnpm install`
- [ ] Verify these are installed:
  - [ ] `@react-native-community/slider@^5.2.0`
  - [ ] `@beta-gamer/react-native@^0.1.36`
  - [ ] `@supabase/supabase-js@^2.102.1`
  - [ ] `expo-router@~6.0.23`

### Environment Setup
- [ ] Create/update `.env` file
- [ ] Add `EXPO_PUBLIC_SUPABASE_URL=your_url`
- [ ] Add `EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key`
- [ ] Add `EXPO_PUBLIC_BETA_GAMER_API_URL=https://beta-gamer.onrender.com`

---

## Phase 3: Database Setup (1-2 hours)

### Supabase Project Setup
- [ ] Log into Supabase dashboard
- [ ] Create new project or use existing
- [ ] Copy project URL and anon key to `.env`

### Create Tables (Run SQL in Supabase SQL Editor)

#### Core Tables
- [ ] Create `users` table
- [ ] Create `ttt_matches` table
- [ ] Create `ttt_match_players` table
- [ ] Create `ttt_board_state` table
- [ ] Create `ttt_moves` table
- [ ] Create `ttt_results` table
- [ ] Create `user_game_preferences` table

#### Optional Tables
- [ ] Create `ttt_afk_events` table (if tracking AFK)

### Indexes
- [ ] Add indexes on `users.player_id`
- [ ] Add indexes on `ttt_matches.session_id`
- [ ] Add indexes on `ttt_matches.room_id`
- [ ] Add indexes on `ttt_match_players.match_id`
- [ ] Add indexes on `ttt_moves.match_id`
- [ ] Add indexes on `ttt_results.match_id`

### Security
- [ ] Enable RLS on all tables
- [ ] Create SELECT policies
- [ ] Create INSERT policies
- [ ] Create UPDATE policies
- [ ] Create DELETE policies (if needed)

### Test Database
- [ ] Insert test user record
- [ ] Insert test match record
- [ ] Verify foreign keys work
- [ ] Test RLS policies

---

## Phase 4: Code Integration (2-3 hours)

### Create Supabase Client
- [ ] Create `lib/supabase.ts` file
- [ ] Initialize Supabase client
- [ ] Export client for use in app
- [ ] Test connection: `supabase.from('users').select('*').limit(1)`

### Update Game Hook (`app/hooks/useTictactoeGame.ts`)

#### Session Management
- [ ] Add function to save session to database
- [ ] Update `createSession` to call Supabase
- [ ] Add error handling for database failures

#### Move Tracking
- [ ] Add function to save moves to database
- [ ] Update `handleMove` to call Supabase
- [ ] Add move validation

#### Game Results
- [ ] Add function to save game results
- [ ] Update `handleGameEnd` to call Supabase
- [ ] Implement payout calculation
- [ ] Update wallet balance on win

#### User Preferences
- [ ] Add function to load preferences from database
- [ ] Add function to save preferences to database
- [ ] Update settings modal to use database
- [ ] Add preference caching

### Update Components

#### SessionProvider
- [ ] Verify it provides session token correctly
- [ ] Add Supabase user context if needed
- [ ] Add authentication state

#### SettingsModal
- [ ] Connect to database for loading settings
- [ ] Connect to database for saving settings
- [ ] Add loading states
- [ ] Add error handling

---

## Phase 5: Testing (1-2 hours)

### Basic Functionality
- [ ] App starts without errors
- [ ] TTT home screen loads
- [ ] Can navigate to stake selection
- [ ] Can select a stake amount
- [ ] Game board renders
- [ ] Can make moves on board
- [ ] Game detects wins correctly
- [ ] Game detects draws correctly
- [ ] Game over modal appears
- [ ] Can navigate back to home

### Database Integration
- [ ] Session saves to `ttt_matches` table
- [ ] Players save to `ttt_match_players` table
- [ ] Board state saves to `ttt_board_state` table
- [ ] Moves save to `ttt_moves` table
- [ ] Results save to `ttt_results` table
- [ ] Wallet updates on win
- [ ] Preferences load from database
- [ ] Preferences save to database

### Error Handling
- [ ] Handles network errors gracefully
- [ ] Handles database errors gracefully
- [ ] Shows user-friendly error messages
- [ ] Doesn't crash on failed API calls
- [ ] Recovers from connection loss

### Edge Cases
- [ ] Test with slow network
- [ ] Test rapid move submissions
- [ ] Test game abandonment
- [ ] Test invalid moves
- [ ] Test concurrent games (if applicable)

---

## Phase 6: Optimization (Optional, 1-2 hours)

### Performance
- [ ] Add database query caching
- [ ] Optimize image loading
- [ ] Reduce bundle size
- [ ] Add loading indicators

### User Experience
- [ ] Add haptic feedback
- [ ] Add sound effects
- [ ] Add animations
- [ ] Improve error messages

### Monitoring
- [ ] Set up error tracking (Sentry/Bugsnag)
- [ ] Add analytics events
- [ ] Monitor database performance
- [ ] Track user engagement

---

## Phase 7: Deployment Preparation (30 minutes)

### Code Review
- [ ] Review all changes
- [ ] Check for console.log statements
- [ ] Remove debug code
- [ ] Update comments

### Documentation
- [ ] Update README if needed
- [ ] Document API endpoints
- [ ] Document database schema
- [ ] Create migration scripts

### Git
- [ ] Commit all changes
- [ ] Push to remote: `git push origin ttt-integration`
- [ ] Create pull request
- [ ] Request code review

---

## Phase 8: Merge to Main (After Review)

### Pre-Merge
- [ ] All tests passing
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] CI/CD pipeline green

### Merge
- [ ] Merge pull request
- [ ] Delete integration branch (optional)
- [ ] Tag release version
- [ ] Update changelog

### Post-Merge
- [ ] Verify production deployment
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Gather user feedback

---

## Quick Commands Reference

```bash
# Git
git fetch --all
git checkout -b ttt-integration
git merge origin/games
git push origin ttt-integration

# Dependencies
npm install
npx expo start --clear

# Testing
npx expo start --android
npx expo start --ios
npx tsc --noEmit

# Database (Supabase CLI)
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

---

## Files to Focus On

### Must Modify
1. `app/hooks/useTictactoeGame.ts` - Add Supabase integration
2. `lib/supabase.ts` - Create Supabase client (NEW FILE)
3. `.env` - Add environment variables

### May Need to Modify
1. `app/TTT/components/SettingsModal.tsx` - Connect to database
2. `app/components/SessionProvider.tsx` - Add auth context
3. `app/TTT/main.tsx` - Add error handling

### Don't Modify (UI Only)
1. `app/component/TictactoeBoard.tsx` - UI component
2. `app/TTT/home.tsx` - UI screen
3. `app/TTT/stake.tsx` - UI screen
4. `assets/ttt/*` - Image assets

---

## Estimated Time Breakdown

| Phase | Task | Time |
|-------|------|------|
| 1 | Git Integration | 30 min |
| 2 | Dependencies | 15 min |
| 3 | Database Setup | 1-2 hours |
| 4 | Code Integration | 2-3 hours |
| 5 | Testing | 1-2 hours |
| 6 | Optimization | 1-2 hours (optional) |
| 7 | Deployment Prep | 30 min |
| **Total** | **Minimum** | **5-6 hours** |
| **Total** | **With Optimization** | **6-8 hours** |

---

## Need Help?

### Resources
- **Detailed Guide:** `TTT_INTEGRATION_GUIDE.md`
- **UI Documentation:** `TTT_UI_IMPROVEMENTS.md`
- **Database Schema:** `app/TTT/DATABASE_FIELDS.md`

### Common Issues
- **Module not found:** Run `npm install` and `npx expo start --clear`
- **Asset errors:** Check `assets/ttt/` folder exists
- **Database errors:** Verify `.env` variables and RLS policies
- **Navigation errors:** Check `app/TTT/_layout.tsx` exists

### Support
- Check troubleshooting section in `TTT_INTEGRATION_GUIDE.md`
- Review commit history for context
- Contact team for assistance

---

**Quick Start:** If you just want to get it running quickly, do Phase 1, 2, and test without database integration first. Then add database in Phase 3-4.

**Document Version:** 1.0.0  
**Last Updated:** May 2, 2026
