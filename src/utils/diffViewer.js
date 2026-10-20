/**
 * Computes a simple word/token-level diff between expected and actual output.
 * Returns an array of tokens with status: 'match', 'added', or 'removed'.
 */
export function computeTokenDiff(expectedStr = "", actualStr = "") {
  const expTokens = String(expectedStr).trim().split(/\s+/).filter(Boolean);
  const actTokens = String(actualStr).trim().split(/\s+/).filter(Boolean);

  // If both empty
  if (expTokens.length === 0 && actTokens.length === 0) {
    return { isIdentical: true, expectedTokens: [], actualTokens: [] };
  }

  // Token-by-token comparison
  const maxLen = Math.max(expTokens.length, actTokens.length);
  const expectedTokens = [];
  const actualTokens = [];

  for (let i = 0; i < maxLen; i++) {
    const exp = expTokens[i];
    const act = actTokens[i];

    if (exp !== undefined && act !== undefined) {
      if (exp === act) {
        expectedTokens.push({ text: exp, status: "match" });
        actualTokens.push({ text: act, status: "match" });
      } else {
        expectedTokens.push({ text: exp, status: "expected-diff" });
        actualTokens.push({ text: act, status: "actual-diff" });
      }
    } else if (exp !== undefined) {
      expectedTokens.push({ text: exp, status: "missing" });
    } else if (act !== undefined) {
      actualTokens.push({ text: act, status: "extra" });
    }
  }

  const isIdentical = String(expectedStr).trim() === String(actualStr).trim();
  return { isIdentical, expectedTokens, actualTokens };
}
