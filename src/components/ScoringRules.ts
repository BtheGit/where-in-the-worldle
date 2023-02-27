// To allow for different size maps. World vs city etc. Might not use for a while. But it would be nice to
// at least have the rules as a part of each days puzzle. So it can at least be customized a bit on the fly
// based on player feedback/complaints.
export default class GameRules {
  maxTurns: number;
  proportionBasis: number;
  steps: number[];

  constructor(
    maxTurns = 8,
    proportionBasis = 100,
    steps = [1, 20, 500, 2000, 20_000]
  ) {
    this.maxTurns = maxTurns;
    this.proportionBasis = proportionBasis;
    this.steps = steps;
  }
}
