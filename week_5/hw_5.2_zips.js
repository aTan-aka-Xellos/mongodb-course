use test
db.zips.aggregate([
    /*get the population of every city in every state*/
    {$group:
     {
     _id: {state:"$state", city:"$city"},
     population: {$sum:"$pop"},
     }
    },
    /*get the cities with populations over 25,000 in specified states*/
    {$match: 
     {$or: [
        {"_id.state": "CA"}, 
        {"_id.state": "NY"}
        ], 
      population: {$gt: 25000 } 
     }
    },
    /* get the average population of every city in every state */
    {$group:
     {
      _id: null,
      avgPop: {$avg:"$population"},
     }
    }
])

/*CT and NJ*/
db.zips.aggregate([
    /*get the population of every city in every state*/
    {$group:
     {
     _id: {state:"$state", city:"$city"},
     population: {$sum:"$pop"},
     }
    },
    /*get the cities with populations over 25,000 in specified states*/
    {$match: 
     {$or: [
        {"_id.state": "CT"}, 
        {"_id.state": "NJ"}
        ], 
      population: {$gt: 25000 } 
     }
    },
    /* get the average population of every city in every state */
    {$group:
     {
      _id: null,
	  avgPop: {$avg:"$population"},
     }
    }
])

/*first_phase*/
db.zips.aggregate([
    /*get the population of every city in every state*/
    {$group:
     {
     _id: {state:"$state", city:"$city"},
     population: {$sum:"$pop"},
     }
    }
])

/*second_phase*/
db.zips.aggregate([
    /*get the population of every city in every state*/
    {$group:
     {
     _id: {state:"$state", city:"$city"},
     population: {$sum:"$pop"},
     }
    },
    /*get the cities with populations over 25,000 in specified states*/
    {$match: 
     {$or: [
        {"_id.state": "CT"}, 
        {"_id.state": "NJ"}
        ], 
      population: {$gt: 25000 } 
     } 
    }
])

db.zips.aggregate([
    /*get the population of every city in every state*/
    {$group:
     {
     _id: {state:"$state", city:"$city"},
     population: {$sum:"$pop"},
     }
    },
    /*get the cities with populations over 25,000 in specified states*/
    {$match: 
     {
        "_id.state": "CT", 
        population: {$gt: 25000 } 
     } 
    }
])
