// Calculate exact lengths
const NUM_CARDS = 5;
const PIN_DURATION = 0.01;
const DRUM_SPEED = 1.5;

let t = 0;
// Drum segments
for (let i = 0; i < NUM_CARDS - 1; i++) {
  // t is roughly i * DRUM_SPEED + PIN_DURATION / 2 
}
// Drum ends at 5 * DRUM_SPEED

// Skills takes:
// skillsStart = 7.5;
// cardStagger = 1; cardTravel = 1.5;
// lastCardExitTime = 7.5 + 0.5 + 4 * 0.6 + 1.5 = 11.9
// Then exits at +1.5 -> 13.4
// toolsStart = 11.9 + 1.5 = 13.4
// toolsExitTime = 13.4 + 1.5 = 14.9
// then exit at +1.5 -> 16.4
// journeyStart = 14.9 + 1.5 = 16.4
// lastJourneyExit = 16.4 + 3 * 1.5 + 4 = 24.9
// contact starts at 22.9
// buffer + 4 -> 26.9

// Total timeline duration is roughly 26.9!
console.log("Total timeline: 26.9");
console.log("Drum physical VH mapping: ", (7.5 / 26.9) * 35);
