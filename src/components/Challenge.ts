export class Challenge {
  id = 0;
  // Could also make the rules be different (scales, guess limit, location... instead of just location)
  secretLocation = {
    lat: 0,
    lng: 0,
  };
  guesses = [];
  isFinished = false;
  // We could have a win state (ie the smallest bullseye). But I think it makes more sense to just give people a general end state.

  guess(location: any) {
    // Given a location, score based on game's chosen scoring mechanism.
    // Create new guess, add to guesses.
    // Determine if game is finished based on chosen scoring mechanism.
    // If endstate reached, call end method (or at least flip flag).
  }
}
