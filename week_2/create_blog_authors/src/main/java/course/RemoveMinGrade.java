package course.homework;

import static com.mongodb.client.model.Accumulators.min;
import static com.mongodb.client.model.Aggregates.group;
import static com.mongodb.client.model.Aggregates.match;
import static com.mongodb.client.model.Aggregates.sort;
import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Indexes.ascending;
import static com.mongodb.client.model.Indexes.descending;
import static com.mongodb.client.model.Sorts.orderBy;
import static course.homework.Helpers.printJson;
import static course.homework.JsonHelper.getId;
import static course.homework.JsonHelper.getMinScore;

import com.mongodb.AggregationOptions;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RemoveMinGrade {

    public static void main(String[] args) {

        Block<Document> printBlock = new Block<Document>() {
            @Override
            public void apply(final Document document) {
                System.out.println(document.toJson());
            }
        };

        MongoClient client = new MongoClient();

        MongoDatabase database = client.getDatabase("students");
        final MongoCollection<Document> collection = database.getCollection("grades");


        Bson filter = eq("type", "homework");

        Bson sort = orderBy(ascending("student_id"), ascending("score"));


        List<Document> all = collection.find(filter)
                .sort(sort)
                .limit(10)
                .into(new ArrayList<Document>());

//      db.grades.aggregate([{ $match: {"type": "homework"}}, {$group: {"_id": "$student_id", minScore: { $min: "$score" } }}, { $sort : { _id : -1}} ])


        collection.aggregate(
                Arrays.asList(
                    match(eq("type", "homework")),
                    group("$student_id", min("minScore", "$score")),
                    sort(descending("_id"))

        )).forEach((Block<? super Document>) e ->
                collection.deleteOne(and(eq("score", getMinScore(e.toJson())), eq("student_id", getId(e.toJson())))));




//        for (Document cur : all) {
//            printJson(cur);
//            System.out.println(JsonHelper.getStudentId(cur.toJson()));
//        }
//        System.out.println(all.size());


//        collection.deleteMany()

    }
}
