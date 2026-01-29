function highlightTopScore(scoreValue, maxValue) {
  if (scoreValue === maxValue) {
    return "🎉✨"
  }
}

function formatScore(value) {
  return value + " points"
}

module.exports = {
  highlightTopScore,
  formatScore
}
