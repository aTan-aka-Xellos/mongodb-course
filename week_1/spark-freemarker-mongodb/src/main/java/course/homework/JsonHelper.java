package course.homework;


import com.jayway.jsonpath.JsonPath;

public class JsonHelper {


    public static int getStudentId(String json) {
        return JsonPath.read(json, "$.student_id");
    }

    public static int getId(String json) {
        return JsonPath.read(json, "$._id");
    }

    public static Double getMinScore(String json) {
        return JsonPath.read(json, "$.minScore");
    }




    public static String updateTaskName(String json, String value) {
        return JsonPath.parse(json).set("$.Name", value).jsonString();
    }



}
