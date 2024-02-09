/* @flow */

// Credit: https://gist.github.com/ryanspradlin/18c1010b7dd2d875284933d018c5c908

// Derived from: https://en.wikipedia.org/wiki/Brent%27s_method#Algorithm

// Brent's method is a hybrid root-finding algorithm that combines the
// faster/less-reliable inverse quadradic interpolation and secant methods with
// the slower/more-reliable bisection method.

export type Params = {
  fn: (...inputs: any[]) => number;
  fnParams: any[];
  lowerBound: number;
  upperBound: number;
  tolerance: number;
  maxIterations: number;
  independentVariableIdx: number;
};

export function brent({
  fn,
  fnParams,
  lowerBound,
  upperBound,
  tolerance,
  maxIterations,
  independentVariableIdx
}: Params): number {
  let a = lowerBound;
  let b = upperBound;
  //   var fnParams = [45, eff_uf, inputData]; // first guess fn(Cd[0]) --> Cd[1000]
  fnParams[independentVariableIdx] = lowerBound;
  let fa = fn.apply(null, fnParams) // f(a);
  //   var fnParams = [145, eff_uf, inputData]; // first guess fn(Cd[0]) --> Cd[1000]
  fnParams[independentVariableIdx] = upperBound;
  let fb = fn.apply(null, fnParams) // f(b);

  if (fa * fb > 0) {
    // Root is not bracketed.
    throw new Error(`Root is not bracketed: [${fa}, ${fb}].`);
  }

  if (Math.abs(fa) < Math.abs(fb)) {
    [a, b] = [b, a];
    [fa, fb] = [fb, fa];
  }

  let c = a;
  let fc = fa;
  let s = 0;
  let d = 0;
  let mflag = true;
  for (let i = 0; i < maxIterations; i++) {
    // Check if we have succeeded...
    if (fb === 0 || Math.abs(b - a) <= tolerance) {
      // Root found!
      return b;
    }

    // Try to use fast/less-reliable methods first...
    if (fa !== fc && fb !== fc) {
      // Inverse quadratic interpolation.
      s =
        (a * fb * fc) / ((fa - fb) * (fa - fc)) +
        (b * fa * fc) / ((fb - fa) * (fb - fc)) +
        (c * fa * fb) / ((fc - fa) * (fc - fb));
    } else {
      // Secant method.
      s = b - fb * ((b - a) / (fb - fa));
    }

    // If necessary, fallback to slow/more-reliable method...
    if (
      (s - (3 * a + b) / 4) * (s - b) >= 0 ||
      (mflag && Math.abs(s - b) >= Math.abs(b - c) / 2) ||
      (!mflag && Math.abs(s - b) >= Math.abs(c - d) / 2) ||
      (mflag && Math.abs(b - c) < Math.abs(tolerance)) ||
      (!mflag && Math.abs(c - d) < Math.abs(tolerance))
    ) {
      // Bisection method.
      s = (a + b) / 2;
      mflag = true;
    } else {
      mflag = false;
    }

    d = c;
    c = b;
    fc = fb;

    // const fs = f(s);
    fnParams[independentVariableIdx] = s;
    const fs = fn.apply(null, fnParams);
    if (fa * fs < 0) {
      b = s;
      fb = fs;
    } else {
      a = s;
      fa = fs;
    }

    if (Math.abs(fa) < Math.abs(fb)) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
    }
  }

  // Could not achieve required tolerance within iteration limit.
  throw new Error(
    'Could not achieve required tolerance within iteration limit.'
  );
}
