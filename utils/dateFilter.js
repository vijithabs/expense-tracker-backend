
const getDateRange = (range = "monthly") => {
    const now = new Date()

    const ranges = {
        daily: new Date(now.getFullYear(), now.getMonth(), now.getDate()),

        weekly: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.Day()

        ),
        monthly: new Date(now.getFullYear(), now.getMonth(), 1)
    }
    return {
        start: ranges[range] || ranges.monthly,
        end: new Date()
    }

}

module.exports = getDateRange