function robot (content) {
    sanitizeContent(content)

    function sanitizeContent (content) {
        const originalSourceContentInLines = breakInLines(content.sourceContentOriginal)
        const withoutBlankLines = removeBlankLines(originalSourceContentInLines)
        const withoutMarkdown = removeMarkdown(withoutBlankLines)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutMarkdown)
        const contentSanitized = joinLines(withoutDatesInParentheses)
        
        content.sourceContentSanitized = contentSanitized

        function breakInLines (text) {
            return text.split('\n')
        }

        function removeBlankLines (lines) {
            const blankLinesRemoved = lines.filter(line => {
                return line.trim().length === 0 ? false : true
            })

            return blankLinesRemoved
        }

        function removeMarkdown (lines) {
            const markdownRemoved = lines.filter(line => 
                line.trim().startsWith('=') ? false : true)

            return markdownRemoved
        }

        function removeDatesInParentheses (lines) {
            return lines.map(line => 
                line.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '')
                .replace(/  /g,' '))
        }

        function joinLines (lines) {
            return lines.join(' ')
        }
    }
}

module.exports = robot