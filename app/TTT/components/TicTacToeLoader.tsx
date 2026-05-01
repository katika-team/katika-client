/**
 * TicTacToeLoader.tsx
 * ─────────────────────────────────────────────────────────────────
 * A self-contained loading screen that:
 *   1. Draws a tic-tac-toe game animation on loop
 *   2. After `displayDuration` ms (default 3 000), calls `onFinish`
 *      so the parent can navigate to the next screen
 *   3. Cleans up safely on unmount (stops animation + clears timer)
 *
 * ── Dependencies ──────────────────────────────────────────────────
 *   npm install react-native-svg
 *   (or: expo install react-native-svg)
 *
 * ── Usage with React Navigation ───────────────────────────────────
 *   import { useNavigation } from '@react-navigation/native';
 *   import TicTacToeLoader from './TicTacToeLoader';
 *
 *   export default function SplashScreen() {
 *     const nav = useNavigation();
 *     return (
 *       <TicTacToeLoader
 *         onFinish={() => nav.replace('Home')}
 *       />
 *     );
 *   }
 *
 * ── Usage with Expo Router ────────────────────────────────────────
 *   import { useRouter } from 'expo-router';
 *   import TicTacToeLoader from './TicTacToeLoader';
 *
 *   export default function SplashScreen() {
 *     const router = useRouter();
 *     return (
 *       <TicTacToeLoader
 *         onFinish={() => router.replace('/home')}
 *       />
 *     );
 *   }
 *
 * ── Customisation ─────────────────────────────────────────────────
 *   <TicTacToeLoader
 *     onFinish={() => navigation.replace('Home')}
 *     displayDuration={5000}   // show for 5 s instead of 3 s
 *   />
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

// ─── Animated SVG primitives ──────────────────────────────────────
// react-native-svg elements are not animatable by default.
// Wrapping them with createAnimatedComponent lets Animated.Value
// drive SVG attributes (like strokeDashoffset) directly and efficiently.
const AnimatedLine   = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Props ────────────────────────────────────────────────────────
interface Props {
  /**
   * Called once after `displayDuration` ms have elapsed.
   * Navigate to the next screen inside this callback.
   * Example: () => navigation.replace('Home')
   */
  onFinish: () => void;

  /**
   * How long (in milliseconds) to show the loader before calling onFinish.
   * The animation keeps looping during this window regardless of
   * where it is in its cycle.
   * Default: 3000 (3 seconds)
   */
  displayDuration?: number;
}

// ─── SVG geometry constants ───────────────────────────────────────
// All values are in SVG user units (1:1 with px at standard density).

const SIZE = 240;   // Total canvas width & height
const CELL = 70;    // Each of the 9 cells is 70 × 70
const PAD  = 15;    // Gap between the canvas edge and the outer grid lines

// The two interior grid lines along each axis:
const G1 = PAD + CELL;       // left/top divider   → 85
const G2 = PAD + CELL * 2;   // right/bottom divider → 155

// Where the grid lines start and end:
const GS = PAD;               // grid start → 15
const GE = PAD + CELL * 3;   // grid end   → 225

const LINE_LEN = GE - GS;    // each grid line is 210 px long

// X mark — drawn as two crossing diagonal lines
const X_HALF = 18;                         // half-length from center to tip
const X_LEN  = Math.SQRT2 * X_HALF * 2;   // full diagonal arm ≈ 50.9 px

// O mark — drawn as a circle animated via strokeDashoffset
const O_R    = 20;                   // circle radius in px
const O_CIRC = 2 * Math.PI * O_R;   // full circumference ≈ 125.7 px

/** Returns the pixel center {x, y} of the grid cell at [row, col]. */
const cellCenter = (row: number, col: number) => ({
  x: PAD + CELL * col + CELL / 2,
  y: PAD + CELL * row + CELL / 2,
});

/**
 * Y coordinate of the horizontal win line.
 * It passes through the vertical centre of the top row.
 */
const WIN_LINE_Y = PAD + CELL / 2; // = 50

// ─── Colors ───────────────────────────────────────────────────────
const COLORS = {
  grid: '#7F77DD', // purple 400 — the board grid
  x:    '#D85A30', // coral  400 — X marks
  o:    '#1D9E75', // teal   400 — O marks
  win:  '#BA7517', // amber  600 — winning strike-through line
} as const;

// ─── Move sequence ────────────────────────────────────────────────
// Format: [player, row, col]
// X wins the top row on move 5.
//
//   Grid reference:
//   ┌─────┬─────┬─────┐
//   │ 0,0 │ 0,1 │ 0,2 │  ← X wins this row
//   ├─────┼─────┼─────┤
//   │ 1,0 │ 1,1 │ 1,2 │
//   ├─────┼─────┼─────┤
//   │ 2,0 │ 2,1 │ 2,2 │
//   └─────┴─────┴─────┘
type Player = 'X' | 'O';
const MOVES: [Player, number, number][] = [
  ['X', 0, 0], // move 1 — X top-left
  ['O', 1, 1], // move 2 — O center
  ['X', 0, 2], // move 3 — X top-right
  ['O', 2, 0], // move 4 — O bottom-left
  ['X', 0, 1], // move 5 — X top-center → X wins!
];

// ─── Animation timing (ms) ────────────────────────────────────────
const T = {
  grid:    400,  // how long each grid line takes to draw
  gridGap:  70,  // stagger delay between the 4 grid lines
  mark:    350,  // how long each X or O takes to draw
  pause:   500,  // pause between consecutive moves
  win:     500,  // how long the win line takes to draw
  hold:    900,  // hold the finished board before looping
};

// Single easing curve used for every draw animation.
// Starts fast then decelerates — feels like a confident pen stroke.
const ease = Easing.out(Easing.cubic);

// ─── Component ────────────────────────────────────────────────────
export default function TicTacToeLoader({
  onFinish,
  displayDuration = 3000,
}: Props) {

  // ── Animated.Value refs ───────────────────────────────────────
  // Each value goes 0 → 1 as its element draws in.
  // Refs (not state) so they survive re-renders without triggering them.

  /** One progress value per grid line (4 total) */
  const gRef = useRef(Array.from({ length: 4 }, () => new Animated.Value(0)));

  /** One progress value per move / mark (5 total) */
  const mRef = useRef(Array.from({ length: 5 }, () => new Animated.Value(0)));

  /** Progress value for the win strike-through line */
  const wRef = useRef(new Animated.Value(0));

  const g = gRef.current;
  const m = mRef.current;
  const w = wRef.current;

  /**
   * Holds the active CompositeAnimation so we can call .stop() on unmount.
   * Without this, animations would continue running after the screen
   * is removed from the tree, leaking memory and causing warnings.
   */
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  // ── Helpers ───────────────────────────────────────────────────

  /**
   * Creates an Animated.timing with our shared easing curve.
   *
   * useNativeDriver: false is mandatory here — the native driver only
   * supports transform and opacity, not SVG-specific props like
   * strokeDashoffset.
   */
  const tween = (v: Animated.Value, duration: number, delay = 0) =>
    Animated.timing(v, {
      toValue:         1,
      duration,
      delay,
      easing:          ease,
      useNativeDriver: false,
    });

  /**
   * Maps an Animated.Value [0 → 1] to a strokeDashoffset that "draws"
   * the SVG path from invisible to fully visible.
   *
   * Technique explained:
   *   strokeDasharray = <len>   → the whole path is treated as a single dash
   *   strokeDashoffset = <len>  → the dash is shifted completely out of view
   *   strokeDashoffset = 0      → the dash sits in its natural position (fully drawn)
   *
   *   Animating offset from `len` → 0 makes the path appear to draw itself.
   */
  const dash = (v: Animated.Value, len: number) =>
    v.interpolate({ inputRange: [0, 1], outputRange: [len, 0] });

  // ── Animation loop ────────────────────────────────────────────

  /**
   * Resets all Animated.Values to 0 and plays the game sequence.
   * Called recursively on completion to loop until unmount.
   */
  const run = () => {
    // Snap everything back to the start of the sequence
    [...g, ...m, w].forEach(v => v.setValue(0));

    animRef.current = Animated.sequence([

      // 1 ─ Draw the 4 grid lines in parallel, each staggered by gridGap ms.
      //     They appear to pop in one after another in a quick burst.
      Animated.parallel(
        g.map((v, i) => tween(v, T.grid, i * T.gridGap))
      ),

      // 2 ─ Short pause so the board registers before moves begin
      Animated.delay(T.pause / 2),

      // 3 ─ Play each of the 5 moves with a natural pause in between.
      //     flatMap produces the flat sequence:
      //     [tween(m[0]), delay, tween(m[1]), delay, tween(m[2]), ...]
      ...m.flatMap(v => [tween(v, T.mark), Animated.delay(T.pause)]),

      // 4 ─ Draw the win line across the winning row
      tween(w, T.win),

      // 5 ─ Hold the finished board so it reads clearly before resetting
      Animated.delay(T.hold),

    ]);

    animRef.current.start(({ finished }) => {
      // `finished` is false when .stop() was called (e.g. on unmount).
      // Only restart the loop if the sequence completed naturally.
      if (finished) run();
    });
  };

  // ── Lifecycle ─────────────────────────────────────────────────
  useEffect(() => {
    // Start the looping animation as soon as the screen mounts
    run();

    /**
     * Set a one-shot timer that fires `onFinish` after `displayDuration` ms.
     *
     * Why a plain setTimeout and not an Animated callback?
     * → The animation loops indefinitely. A timer is the simplest,
     *   most reliable way to enforce a fixed display window without
     *   coupling the navigation logic to the animation cycle length.
     */
    const redirectTimer = setTimeout(() => {
      onFinish();
    }, displayDuration);

    // ── Cleanup — runs when the component unmounts ─────────────
    return () => {
      // 1. Cancel the redirect timer so onFinish is never called
      //    after the screen has already been removed from the tree.
      clearTimeout(redirectTimer);

      // 2. Stop the running animation to release resources and prevent
      //    the "setState on unmounted component" React warning.
      animRef.current?.stop();
    };

    // onFinish and displayDuration are intentionally excluded from the
    // dependency array — we only want this effect to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ────────────────────────────────────────────────────
  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE}>

        {/* ── Grid lines ──────────────────────────────────────── */}

        {/* Vertical divider 1 — separates col 0 from col 1 */}
        <AnimatedLine
          x1={G1} y1={GS} x2={G1} y2={GE}
          stroke={COLORS.grid} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={dash(g[0], LINE_LEN)}
        />
        {/* Vertical divider 2 — separates col 1 from col 2 */}
        <AnimatedLine
          x1={G2} y1={GS} x2={G2} y2={GE}
          stroke={COLORS.grid} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={dash(g[1], LINE_LEN)}
        />
        {/* Horizontal divider 1 — separates row 0 from row 1 */}
        <AnimatedLine
          x1={GS} y1={G1} x2={GE} y2={G1}
          stroke={COLORS.grid} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={dash(g[2], LINE_LEN)}
        />
        {/* Horizontal divider 2 — separates row 1 from row 2 */}
        <AnimatedLine
          x1={GS} y1={G2} x2={GE} y2={G2}
          stroke={COLORS.grid} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={dash(g[3], LINE_LEN)}
        />

        {/* ── X and O marks ───────────────────────────────────── */}
        {MOVES.map(([player, row, col], i) => {
          const { x, y } = cellCenter(row, col);

          if (player === 'X') {
            // Both arms share the same progress value (m[i]) so they
            // draw in simultaneously, giving a snappy "stamp" effect.
            return (
              <React.Fragment key={i}>
                {/* Arm 1: top-left ↘ bottom-right */}
                <AnimatedLine
                  x1={x - X_HALF} y1={y - X_HALF}
                  x2={x + X_HALF} y2={y + X_HALF}
                  stroke={COLORS.x} strokeWidth={7} strokeLinecap="round"
                  strokeDasharray={X_LEN}
                  strokeDashoffset={dash(m[i], X_LEN)}
                />
                {/* Arm 2: top-right ↙ bottom-left */}
                <AnimatedLine
                  x1={x + X_HALF} y1={y - X_HALF}
                  x2={x - X_HALF} y2={y + X_HALF}
                  stroke={COLORS.x} strokeWidth={7} strokeLinecap="round"
                  strokeDasharray={X_LEN}
                  strokeDashoffset={dash(m[i], X_LEN)}
                />
              </React.Fragment>
            );
          }

          // O mark — animating dashOffset from circumference → 0
          // "unrolls" the circle stroke to make it appear drawn by hand.
          return (
            <AnimatedCircle
              key={i}
              cx={x} cy={y} r={O_R}
              fill="none"
              stroke={COLORS.o} strokeWidth={7} strokeLinecap="round"
              strokeDasharray={O_CIRC}
              strokeDashoffset={dash(m[i], O_CIRC)}
            />
          );
        })}

        {/* ── Win strike-through ──────────────────────────────── */}
        {/* Horizontal line through the top row (winning row).    */}
        {/* Drawn after the 5th move, then held until loop reset. */}
        <AnimatedLine
          x1={GS} y1={WIN_LINE_Y} x2={GE} y2={WIN_LINE_Y}
          stroke={COLORS.win} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={dash(w, LINE_LEN)}
        />

      </Svg>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrap: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: 'transparent', // inherits from your screen's background
  },
});