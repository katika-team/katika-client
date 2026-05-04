# TTT Database Notes

This file only covers the Tic Tac Toe area under `app/TTT`.

The goal is to list the data that should be stored in the database, in plain language, based on the current code. Anything that only exists to animate the UI or open and close modals should stay on the client.

## Player Data

`player_id` is the unique id for the person playing.
In the code it appears as `tokenPlayerId`, `myPlayerId`, and `myPlayer?.id`. This is the id every match, move, result, and wallet update should point back to.

`display_name` is the name shown to other players.
It comes from `myPlayer?.displayName`, the `username` sent while creating a session, or the `name` prop in the `Players` component.

`rank` is the player skill label shown under the name.
The `Players` component receives it as `rank`, for example `beginner`.

`wallet_balance` is the amount the player has available.
The UI passes it as `amount` and displays it as XAF. The database should keep the real balance, not the screen copy.

`online_status` is the player presence state.
The UI uses a color dot for this, but the database should store a real value such as `online`, `offline`, `searching`, or `in_game`.

## Stake Data

`stake_amount` is the amount selected before matchmaking starts.
In `app/TTT/stake.tsx` the value lives in `selectedStake`. It is passed to `SearchModal` as `betAmount` and then carried to the game route as `stake`.

The allowed stake list is currently `500`, `1000`, `3000`, and `5000`.
If you want those amounts to change without editing the app, they should live in the backend instead of only in `stake.tsx`.

## Session Data

`session_id` is the id returned when the app creates a session.
The value comes back as `data.sessionId` from `POST https://beta-gamer.onrender.com/server/skibag/game`.

`session_token` is the token returned with the session.
The app sends it around as `data.sessionToken` and also as the route param `token`.

`game` tells the backend which game is being started.
The current TTT flow sends `game: 'tictactoe'`.

`match_type` tells the backend what kind of match this is.
The current code sends `matchType: 'bot'`, which means the session is bot-based.

`wants_bot` shows whether matchmaking is allowed to use a bot.
`useTictactoeGame` currently sends `wantsBot: true`.

`bot_difficulty` stores which bot level is being used.
The current value is `easy`.

`room_id` is the live socket room used for the match.
The hook stores it in `roomId` after `game:started` sends `d.roomId`.

`match_status` tracks where the match is in its life cycle.
Good values are `searching`, `created`, `playing`, `ended`, and `failed`.

`created_at`, `started_at`, and `ended_at` are the timestamps that mark the match timeline.
Use `created_at` when the session is created, `started_at` when the socket says the game started, and `ended_at` when the game is over.

## Match Players

Each match should store one row for each participant.
The hook receives the participants in `players`.

`player_id` identifies the player in the match.
It comes from `players[].id` or `myPlayerId`.

`symbol` stores whether the player is `X` or `O`.
The hook keeps the local copy in `mySymbol`, and the socket event also provides `d.symbol`.

`turn_order` stores who moves first, second, and so on.
The hook uses `currentTurn` as an index into the `players` array.

`is_bot` marks the automated player.
This is important for bot matches, reporting, and payouts.

## Board State

`board` stores the whole Tic Tac Toe board.
In the hook it is a 9-item array where each cell is `X`, `O`, or `null`.

`current_turn` stores which player should move next.
The hook keeps that in `currentTurn`, and the socket also sends `d.currentTurn`.

`game_over` stores whether the match has finished.
The hook uses `gameOver` for this.

`game_state` is a quick readable status for the game.
The hook returns `playing` or `ended`.

`updated_at` should change whenever the board changes.

## Move History

Each valid move should create a new database record.
This is useful for replay, support, disputes, and debugging.

`room_id` ties the move to the correct match.

`player_id` stores who made the move.
The hook emits it as `playerId: myPlayerId`.

`position` stores the cell that was clicked.
For Tic Tac Toe this is a value from `0` to `8`.

`symbol` stores whether the move was made with `X` or `O`.

`board_after` stores the board after the backend accepts the move.
The socket sends that value as `d.board`.

`turn_after` stores which turn comes next after the move.
The socket sends that value as `d.currentTurn`.

`created_at` stores when the move happened.

## Result Data

`winner_player_id` stores who won the match.
If there is no winner, store `null`.

`reason` stores why the match ended.
The hook stores that in `gameResult.reason`.

`is_draw` stores whether the game ended in a draw.
In `main.tsx` a draw is detected when there is no winner.

`settled_stake_amount` stores the stake used for settlement.
It should match the chosen amount from the stake screen.

`payout_amount` stores the final payout.
The backend should calculate this value, not the client.

## AFK Data

`player_id` stores the player who was warned.
The socket event `tictactoe:afk_warning` includes it.

`seconds_remaining` stores the warning countdown.
The UI keeps it in `afkWarning.secondsRemaining`.

`event_type` stores whether the warning was created or cleared.
Use values like `tictactoe:afk_warning` and `tictactoe:afk_warning_cleared`.

`created_at` stores when the warning happened.

## User Preferences

`sound_enabled`, `music_enabled`, `vibration_enabled`, and `show_hints` come from `SettingsModal`.
These are user preferences, so they should be saved once per user, not once per match.

## Client-Only State

`modalVisible`, `settingsVisible`, `searchVisible`, and `modalType` are only for screen behavior.
They should not go into the database.

Animation values such as `headerOpacity`, `headerY`, `entranceOpacity`, and `pressScale` are also client-only.
They only control motion and should not be persisted.

The local `status` inside `SearchModal` is just popup state.
The backend should store the real match status instead.

## Suggested Tables

`users` should hold player profile, rank, wallet balance, and online status.

`ttt_matches` should hold session id, session token, game type, match type, stake amount, room id, status, and timestamps.

`ttt_match_players` should hold the players in each match, their symbols, turn order, and whether they are bots.

`ttt_moves` should hold the move history.

`ttt_results` should hold the winner, draw status, reason, stake settlement, and payout.

`user_game_preferences` should hold sound, music, vibration, and hint settings.

`ttt_afk_events` can hold AFK warnings and clears if you want a full audit trail.
