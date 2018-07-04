db.zips.aggregate([{
    $project: {
        first_char: {
            $substr: ["$city", 0, 1]
        },
        pop: 1
    }
}, {
    $match: {
        first_char: {
            $in: ["B", "D", "O", "G", "N", "M"]
        }
    }
}, {
    $group: {
        _id: null,
        total: {
            $sum: "$pop"
        }
    }
}])

/*B, D, O, G, N or M*/

/*first phase*/
db.zips.aggregate([{
    $project: {
        first_char: {
            $substr: ["$city", 0, 1]
        }
    }
}])

/*one letter*/
db.zips.aggregate([{
    $project: {
        first_char: {
            $substr: ["$city", 0, 1]
        }
    }
}, {
    $match: {
        "first_char": "B"
    }
}])

/*many letters*/
db.zips.aggregate([{
    $project: {
        first_char: {
            $substr: ["$city", 0, 1]
        }
    }
}, {
    $match: {
        first_char: {
            $in: ["B", "D", "O", "G", "N", "M"]
        }
    }
}])