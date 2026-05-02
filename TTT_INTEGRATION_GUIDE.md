# Tic-Tac-Toe (TTT) Integration Guide

## Overview
This guide will help you integrate the completed Tic-Tac-Toe game from the `games` branch into the main React Native app. This document is specifically for the database/Supabase developer who needs to merge the TTT game and set up the backend integration.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure Overview](#project-structure-overview)
3. [Step-by-Step Integration Process](#step-by-step-integration-process)
4. [Database Schema Requirements](#database-schema-requirements)
5. [Supabase Integration Points](#supabase-integration-points)
6. [Testing Checklist](#testing-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Knowledge
- Git branching and merging
- React Native / Expo Router
- Supabase / PostgreSQL
- TypeScript basics

### Required Tools
- Git
- Node.js (v18+)
- npm/pnpm
- Supabase account and project

### Required Dependencies
The TTT game requires these npm packages (already in package.json):
```json
{
  "@react-native-community/slider": "^5.2.0",
  "@beta-gamer/react-native": "^0.1.36",
  "@supabase/supabase-js": "^2.102.1",
  "expo-router": "~6.0.23"
}
```

---

## Project Structure Overview

### TTT Game Files Location

The Tic-Tac-Toe game consists of the following files and folders:

```
📁 Project Root
├── 📁 app/
│   ├── 📁 TTT/                          # Main TTT game folder
│   │   ├── 📁 components/               # TTT-specific components
│   │   │   ├── 📁 icons/                # Action button icons
│   │   │   │   ├── back.png             # Resign button icon
│   │   │   │   ├── hint.png             # Hint button icon
│   │   │   │   └── settings.png         # Settings button icon
│   │   │   ├── btn.tsx                  # Button component
│   │   │   ├── Modal.tsx                # Modal component
│   │   │   ├── players.tsx              # Player display component
│   │   │   ├── scores.tsx               # Score display component
│   │   │   ├── SettingsModal.tsx        # Settings modal
│   │   │   └── TicTacToeLoader.tsx      # Loading screen
│   │   ├── _layout.tsx                  # TTT route layout
│   │   ├── DATABASE_FIELDS.md           # Database schema documentation
│   │   ├── gameinfo.tsx                 # Game info screen
│   │   ├── home.tsx                     # TTT home screen
│   │   ├── index.tsx                    # TTT entry point
│   │   ├── loading.tsx                  # Loading screen
│   │   ├── main.tsx                     # Main game screen
│   │   ├── policy.tsx                   # Policy screen
│   │   └── stake.tsx                    # Stake selection screen
│   │
│   ├── 📁 component/                    # Shared components
│   │   └── TictactoeBoard.tsx           # Game board component (REQUIRED)
│   │
│   ├── 📁 components/                   # Shared app components
│   │   ├── GameLayout.tsx               # Game layout wrapper (REQUIRED)
│   │   ├── GameOverModal.tsx            # Game over modal (REQUIRED)
│   │   └── SessionProvider.tsx          # Session context provider (REQUIRED)
│   │
│   └── 📁 hooks/                        # Custom hooks
│       └── useTictactoeGame.ts          # Main game logic hook (REQUIRED)
│
├── 📁 assets/
│   └── 📁 ttt/                          # TTT game assets
│       ├── back.png
│       ├── bg.png                       # Background image
│       ├── board.png
│       ├── circle.png
│       ├── cross.png
│       ├── frame.png
│       ├── hint.png
│       ├── ltext.png
│       ├── no.png
│       ├── scores.png
│       ├── settings.png
│       ├── timer.png
│       └── yes.png
│
└── 📄 TTT_UI_IMPROVEMENTS.md            # UI documentation
```

---

## Step-by-Step Integration Process

### Step 1: Checkout and Prepare Branches

```bash
# 1. Make sure you're in the project root
cd /path/to/your/project

# 2. Fetch all remote branches
git fetch --all

# 3. Check current branch
git branch

# 4. Checkout the main app branch (replace 'main' with your actual branch name)
git checkout main  # or master, or development, etc.

# 5. Create a new integration branch
git checkout -b ttt-integration

# 6. Pull latest changes from main branch
git pull origin main
```

### Step 2: Cherry-Pick TTT Files from Games Branch

**Option A: Merge the entire games branch (Recommended if no conflicts)**
```bash
# Merge games branch into your integration branch
git merge origin/games

# If conflicts occur, resolve them manually
# Then commit the merge
git add .
git commit -m "Merge TTT game from games branch"
```

**Option B: Cherry-pick specific files (If you want selective integration)**
```bash
# Get the commit hash from games branch
git log origin/games --oneline | grep "tictactoe"

# Cherry-pick the TTT commit (replace COMMIT_HASH with actual hash)
git cherry-pick COMMIT_HASH

# If conflicts occur, resolve them and continue
git add .
git cherry-pick --continue
```

**Option C: Manual file copy (Most controlled approach)**
```bash
# 1. Checkout games branch temporarily
git checkout games

# 2. Copy TTT folder to a temporary location
cp -r app/TTT /tmp/TTT_backup
cp -r app/TTT/components /tmp/TTT_components_backup
cp app/component/TictactoeBoard.tsx /tmp/
cp app/components/SessionProvider.tsx /tmp/
cp app/hooks/useTictactoeGame.ts /tmp/
cp -r assets/ttt /tmp/ttt_assets_backup

# 3. Go back to your integration branch
git checkout ttt-integration

# 4. Copy files to your branch
cp -r /tmp/TTT_backup app/TTT
cp -r /tmp/TTT_components_backup app/TTT/components
cp /tmp/TictactoeBoard.tsx app/component/
cp /tmp/SessionProvider.tsx app/components/
cp /tmp/useTictactoeGame.ts app/hooks/
cp -r /tmp/ttt_assets_backup assets/ttt

# 5. Stage and commit
git add app/TTT app/component/TictactoeBoard.tsx app/components/SessionProvider.tsx app/hooks/useTictactoeGame.ts assets/ttt
git commit -m "Add TTT game files for integration"
```

### Step 3: Install Dependencies

```bash
# Install all required packages
npm install
# or if using pnpm
pnpm install

# Specifically ensure these are installed:
npm install @react-native-community/slider@^5.2.0
npm install @beta-gamer/react-native@^0.1.36
npm install @supabase/supabase-js@^2.102.1
```

### Step 4: Update Main App Navigation

You need to add TTT to your main app's navigation. This depends on your app structure:

**If using Expo Router (file-based routing):**
The `app/TTT/_layout.tsx` should automatically be picked up by Expo Router. Just ensure your main `app/_layout.tsx` doesn't exclude it.

**If using React Navigation:**
Add TTT screens to your navigator:

```typescript
// In your main navigator file
import TictactoeHome from './TTT/home';
import TictactoeStake from './TTT/stake';
import TictactoeMain from './TTT/main';
// ... other TTT screens

// Add to your stack navigator
<Stack.Screen name="TTT/home" component={TictactoeHome} />
<Stack.Screen name="TTT/stake" component={TictactoeStake} />
<Stack.Screen name="TTT/main" component={TictactoeMain} />
// ... other TTT screens
```

### Step 5: Configure Environment Variables

Create or update your `.env` file with Supabase credentials:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Beta Gamer API (if using)
EXPO_PUBLIC_BETA_GAMER_API_URL=https://beta-gamer.onrender.com
```

### Step 6: Test the Integration

```bash
# Clear cache and start
npx expo start --clear

# Test on your preferred platform
# Press 'a' for Android
# Press 'i' for iOS
# Press 'w' for Web
```

---

## Database Schema Requirements

### Overview
The TTT game requires several database tables to store game state, player data, moves, and results. Refer to `app/TTT/DATABASE_FIELDS.md` for complete details.

### Required Supabase Tables

#### 1. `users` Table
Stores player profile and wallet information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  rank TEXT DEFAULT 'beginner',
  wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
  online_status TEXT DEFAULT 'offline',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_player_id ON users(player_id);
CREATE INDEX idx_users_online_status ON users(online_status);
```

#### 2. `ttt_matches` Table
Stores match session data.

```sql
CREATE TABLE ttt_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  session_token TEXT NOT NULL,
  game TEXT DEFAULT 'tictactoe',
  match_type TEXT DEFAULT 'bot',
  wants_bot BOOLEAN DEFAULT true,
  bot_difficulty TEXT DEFAULT 'easy',
  room_id TEXT,
  stake_amount DECIMAL(10, 2) NOT NULL,
  match_status TEXT DEFAULT 'searching',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ttt_matches_session_id ON ttt_matches(session_id);
CREATE INDEX idx_ttt_matches_room_id ON ttt_matches(room_id);
CREATE INDEX idx_ttt_matches_status ON ttt_matches(match_status);
```

#### 3. `ttt_match_players` Table
Stores players participating in each match.

```sql
CREATE TABLE ttt_match_players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES ttt_matches(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL,
  symbol TEXT CHECK (symbol IN ('X', 'O')),
  turn_order INTEGER NOT NULL,
  is_bot BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ttt_match_players_match_id ON ttt_match_players(match_id);
CREATE INDEX idx_ttt_match_players_player_id ON ttt_match_players(player_id);
```

#### 4. `ttt_board_state` Table
Stores current board state for each match.

```sql
CREATE TABLE ttt_board_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID UNIQUE REFERENCES ttt_matches(id) ON DELETE CASCADE,
  board JSONB NOT NULL DEFAULT '[]',
  current_turn INTEGER DEFAULT 0,
  game_over BOOLEAN DEFAULT false,
  game_state TEXT DEFAULT 'playing',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ttt_board_state_match_id ON ttt_board_state(match_id);
```

#### 5. `ttt_moves` Table
Stores move history for replay and debugging.

```sql
CREATE TABLE ttt_moves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES ttt_matches(id) ON DELETE CASCADE,
  room_id TEXT NOT NULL,
  player_id TEXT NOT NULL,
  position INTEGER CHECK (position >= 0 AND position <= 8),
  symbol TEXT CHECK (symbol IN ('X', 'O')),
  board_after JSONB NOT NULL,
  turn_after INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ttt_moves_match_id ON ttt_moves(match_id);
CREATE INDEX idx_ttt_moves_room_id ON ttt_moves(room_id);
CREATE INDEX idx_ttt_moves_player_id ON ttt_moves(player_id);
```

#### 6. `ttt_results` Table
Stores match results and payouts.

```sql
CREATE TABLE ttt_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID UNIQUE REFERENCES ttt_matches(id) ON DELETE CASCADE,
  winner_player_id TEXT,
  reason TEXT NOT NULL,
  is_draw BOOLEAN DEFAULT false,
  settled_stake_amount DECIMAL(10, 2) NOT NULL,
  payout_amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ttt_results_match_id ON ttt_results(match_id);
CREATE INDEX idx_ttt_results_winner_player_id ON ttt_results(winner_player_id);
```

#### 7. `user_game_preferences` Table
Stores user settings.

```sql
CREATE TABLE user_game_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id TEXT UNIQUE NOT NULL,
  sound_enabled BOOLEAN DEFAULT true,
  music_enabled BOOLEAN DEFAULT true,
  vibration_enabled BOOLEAN DEFAULT true,
  show_hints BOOLEAN DEFAULT true,
  music_volume DECIMAL(3, 2) DEFAULT 0.60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_user_game_preferences_player_id ON user_game_preferences(player_id);
```

#### 8. `ttt_afk_events` Table (Optional)
Stores AFK warnings for audit trail.

```sql
CREATE TABLE ttt_afk_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES ttt_matches(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  seconds_remaining INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ttt_afk_events_match_id ON ttt_afk_events(match_id);
CREATE INDEX idx_ttt_afk_events_player_id ON ttt_afk_events(player_id);
```

### Row Level Security (RLS) Policies

Enable RLS on all tables and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_board_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_game_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE ttt_afk_events ENABLE ROW LEVEL SECURITY;

-- Example policy for users table (adjust based on your auth setup)
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid()::text = player_id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid()::text = player_id);

-- Add similar policies for other tables
```

---

## Supabase Integration Points

### 1. Initialize Supabase Client

Create a Supabase client configuration file:

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Update `useTictactoeGame.ts` Hook

The main game hook (`app/hooks/useTictactoeGame.ts`) needs to be updated to integrate with Supabase. Here are the key integration points:

#### A. Session Creation
```typescript
// When creating a game session, save to Supabase
const createSession = async (stake: number) => {
  // Existing Beta Gamer API call
  const response = await fetch('https://beta-gamer.onrender.com/server/skibag/game', {
    method: 'POST',
    body: JSON.stringify({
      game: 'tictactoe',
      matchType: 'bot',
      wantsBot: true,
      botDifficulty: 'easy',
    }),
  });
  
  const data = await response.json();
  
  // Save to Supabase
  const { error } = await supabase
    .from('ttt_matches')
    .insert({
      session_id: data.sessionId,
      session_token: data.sessionToken,
      stake_amount: stake,
      match_status: 'created',
    });
    
  if (error) console.error('Error saving match:', error);
  
  return data;
};
```

#### B. Save Moves
```typescript
// When a move is made, save to database
const handleMove = async (position: number) => {
  // Existing move logic...
  
  // Save move to Supabase
  const { error } = await supabase
    .from('ttt_moves')
    .insert({
      match_id: currentMatchId,
      room_id: roomId,
      player_id: myPlayerId,
      position,
      symbol: mySymbol,
      board_after: updatedBoard,
      turn_after: nextTurn,
    });
    
  if (error) console.error('Error saving move:', error);
};
```

#### C. Save Game Results
```typescript
// When game ends, save results
const handleGameEnd = async (result: GameResult) => {
  // Update match status
  await supabase
    .from('ttt_matches')
    .update({
      match_status: 'ended',
      ended_at: new Date().toISOString(),
    })
    .eq('session_id', sessionId);
  
  // Save result
  await supabase
    .from('ttt_results')
    .insert({
      match_id: currentMatchId,
      winner_player_id: result.winner,
      reason: result.reason,
      is_draw: !result.winner,
      settled_stake_amount: stakeAmount,
      payout_amount: calculatePayout(result),
    });
  
  // Update wallet balance if player won
  if (result.winner === myPlayerId) {
    await supabase
      .from('users')
      .update({
        wallet_balance: supabase.raw('wallet_balance + ?', [payoutAmount]),
      })
      .eq('player_id', myPlayerId);
  }
};
```

#### D. Load User Preferences
```typescript
// Load settings from database
const loadUserPreferences = async (playerId: string) => {
  const { data, error } = await supabase
    .from('user_game_preferences')
    .select('*')
    .eq('player_id', playerId)
    .single();
    
  if (error) {
    console.error('Error loading preferences:', error);
    return null;
  }
  
  return data;
};
```

#### E. Save User Preferences
```typescript
// Save settings to database
const saveUserPreferences = async (playerId: string, preferences: any) => {
  const { error } = await supabase
    .from('user_game_preferences')
    .upsert({
      player_id: playerId,
      ...preferences,
      updated_at: new Date().toISOString(),
    });
    
  if (error) console.error('Error saving preferences:', error);
};
```

### 3. Real-time Subscriptions (Optional)

For multiplayer features, set up real-time subscriptions:

```typescript
// Subscribe to board state changes
const subscribeToMatch = (matchId: string) => {
  const subscription = supabase
    .channel(`match:${matchId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ttt_board_state',
        filter: `match_id=eq.${matchId}`,
      },
      (payload) => {
        // Update local board state
        setBoard(payload.new.board);
        setCurrentTurn(payload.new.current_turn);
      }
    )
    .subscribe();
    
  return () => {
    subscription.unsubscribe();
  };
};
```

---

## Testing Checklist

### Pre-Integration Testing
- [ ] Verify all files copied correctly
- [ ] Check no missing dependencies
- [ ] Ensure no TypeScript errors
- [ ] Verify assets are accessible

### Functional Testing
- [ ] TTT home screen loads
- [ ] Settings modal opens and closes
- [ ] Policy screen navigation works
- [ ] Game info screen navigation works
- [ ] Stake selection works
- [ ] Game board renders correctly
- [ ] Can make moves on the board
- [ ] Game over modal appears correctly
- [ ] Navigation between screens works

### Database Integration Testing
- [ ] Session creation saves to database
- [ ] Moves are recorded in database
- [ ] Board state updates in database
- [ ] Game results save correctly
- [ ] Wallet balance updates on win
- [ ] User preferences load correctly
- [ ] User preferences save correctly
- [ ] AFK events are logged (if implemented)

### Edge Case Testing
- [ ] Handle network errors gracefully
- [ ] Handle database connection failures
- [ ] Test with slow network
- [ ] Test rapid move submissions
- [ ] Test game abandonment
- [ ] Test simultaneous moves (if multiplayer)

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Module Not Found Errors
```
Error: Unable to resolve module @react-native-community/slider
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

#### Issue 2: Asset Loading Failures
```
Error: Unable to resolve asset ./assets/ttt/bg.png
```

**Solution:**
- Verify assets folder exists at `assets/ttt/`
- Check file names match exactly (case-sensitive)
- Restart Metro bundler: `npx expo start --clear`

#### Issue 3: Navigation Errors
```
Error: The action 'NAVIGATE' with payload {"name":"TTT/home"} was not handled
```

**Solution:**
- Ensure `app/TTT/_layout.tsx` exists
- Check Expo Router configuration in `app/_layout.tsx`
- Verify route names match file structure

#### Issue 4: Supabase Connection Errors
```
Error: Invalid Supabase URL or key
```

**Solution:**
- Verify `.env` file exists and has correct values
- Check environment variables are loaded: `console.log(process.env.EXPO_PUBLIC_SUPABASE_URL)`
- Restart development server after changing `.env`

#### Issue 5: TypeScript Errors
```
Error: Property 'sessionId' does not exist on type 'unknown'
```

**Solution:**
- Add proper type definitions
- Use type assertions where necessary
- Check `tsconfig.json` is properly configured

#### Issue 6: Database Permission Errors
```
Error: new row violates row-level security policy
```

**Solution:**
- Review RLS policies in Supabase dashboard
- Ensure user is authenticated before database operations
- Check policy conditions match your auth setup

---

## Next Steps After Integration

### 1. Backend API Development
- Implement matchmaking logic
- Create bot AI for single-player mode
- Set up WebSocket server for real-time gameplay
- Implement payout calculation logic

### 2. Testing & QA
- Write unit tests for game logic
- Write integration tests for database operations
- Perform load testing for concurrent games
- Test on multiple devices and screen sizes

### 3. Monitoring & Analytics
- Set up error tracking (Sentry, Bugsnag)
- Implement game analytics
- Monitor database performance
- Track user engagement metrics

### 4. Optimization
- Optimize database queries
- Implement caching where appropriate
- Reduce bundle size
- Optimize image assets

### 5. Documentation
- Document API endpoints
- Create database migration scripts
- Write deployment guide
- Create user documentation

---

## Support & Resources

### Documentation References
- **TTT UI Improvements:** `TTT_UI_IMPROVEMENTS.md`
- **Database Fields:** `app/TTT/DATABASE_FIELDS.md`
- **Expo Router:** https://docs.expo.dev/router/introduction/
- **Supabase Docs:** https://supabase.com/docs
- **React Native:** https://reactnative.dev/docs/getting-started

### Contact
If you encounter issues during integration:
1. Check this guide's troubleshooting section
2. Review the existing code comments
3. Check the commit history for context
4. Reach out to the team for support

---

## Appendix

### A. File Dependency Map

```
useTictactoeGame.ts (CORE LOGIC)
├── Uses: @beta-gamer/react-native
├── Uses: @supabase/supabase-js (to be integrated)
└── Provides: Game state and handlers

TictactoeBoard.tsx (UI COMPONENT)
├── Uses: useTictactoeGame hook
└── Renders: 3x3 game board

SessionProvider.tsx (CONTEXT)
├── Provides: Session token context
└── Used by: All TTT screens

main.tsx (MAIN GAME SCREEN)
├── Uses: useTictactoeGame hook
├── Uses: TictactoeBoard component
├── Uses: SessionProvider context
└── Renders: Complete game UI

home.tsx (HOME SCREEN)
├── Uses: SessionProvider context
└── Entry point to TTT game

stake.tsx (STAKE SELECTION)
├── Uses: SessionProvider context
└── Navigates to: main.tsx with stake param
```

### B. Environment Variables Template

```env
# .env file template

# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Beta Gamer API
EXPO_PUBLIC_BETA_GAMER_API_URL=https://beta-gamer.onrender.com

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_TIMEOUT=30000
```

### C. Quick Command Reference

```bash
# Start development server
npx expo start

# Clear cache and start
npx expo start --clear

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Check for issues
npx expo-doctor

# Install dependencies
npm install

# Update dependencies
npm update

# Check TypeScript
npx tsc --noEmit

# Run linter
npm run lint
```

---

**Document Version:** 1.0.0  
**Last Updated:** May 2, 2026  
**Author:** Development Team  
**Status:** Ready for Integration
