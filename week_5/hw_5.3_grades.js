use test
db.grades.aggregate([{
        $unwind: "$scores"
    },
    /*select non-quiz grades*/
    {
        $match: {
            $or: [{
                "scores.type": "homework"
            }, {
                "scores.type": "exam"
            }]
        }
    }, {
        '$group': {
            _id: {
                class_id: "$class_id",
                student_id: "$student_id"
            },
            'average': {
                "$avg": "$scores.score"
            }
        }
    }, {
        '$group': {
            _id: "$_id.class_id",
            'average': {
                "$avg": "$average"
            }
        }
    }, {
        '$sort': {
            'average': -1
        }
    }, {
    	'$limit': 1
    }
])

/*lowest*/
db.grades.aggregate([{
        $unwind: "$scores"
    },
    /*select non-quiz grades*/
    {
        $match: {
            $or: [{
                "scores.type": "homework"
            }, {
                "scores.type": "exam"
            }]
        }
    }, {
        '$group': {
            _id: {
                class_id: "$class_id",
                student_id: "$student_id"
            },
            'average': {
                "$avg": "$scores.score"
            }
        }
    }, {
        '$group': {
            _id: "$_id.class_id",
            'average': {
                "$avg": "$average"
            }
        }
    }, {
        '$sort': {
            'average': 1
        }
    }, {
    	'$limit': 1
    }
])

/*first phase*/
db.grades.aggregate([{
    $unwind: "$scores"
}])

/*second phase*/
db.grades.aggregate([{
        $unwind: "$scores"
    },
    /*select non-quiz grades*/
    {
        $match: {
            $or: [{
                "scores.type": "homework"
            }, {
                "scores.type": "exam"
            }]
        }
    }
])

/*third stage*/
db.grades.aggregate([{
        $unwind: "$scores"
    },
    /*select non-quiz grades*/
    {
        $match: {
            $or: [{
                "scores.type": "homework"
            }, {
                "scores.type": "exam"
            }]
        }
    }, {
        '$group': {
            _id: {
                class_id: "$class_id",
                student_id: "$student_id"
            },
            'average': {
                "$avg": "$scores.score"
            }
        }
    }
])

/*firth phase*/
db.grades.aggregate([{
        $unwind: "$scores"
    },
    /*select non-quiz grades*/
    {
        $match: {
            $or: [{
                "scores.type": "homework"
            }, {
                "scores.type": "exam"
            }]
        }
    }, {
        '$group': {
            _id: {
                class_id: "$class_id",
                student_id: "$student_id"
            },
            'average': {
                "$avg": "$scores.score"
            }
        }
    }, {
        '$group': {
            _id: "$_id.class_id",
            'average': {
                "$avg": "$average"
            }
        }
    }
])