function highlightTopScore(scoreValue, maxValue) {
  if (scoreValue === maxValue) {
    return "🎉✨"
  }
  return ""
}

function formatScore(value) {
  return value + " pts"
}

module.exports = {
  highlightTopScore,
  formatScore
}
