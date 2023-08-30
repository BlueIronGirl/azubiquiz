package com.example.webservice;

import com.example.webservice.entities.Answer;
import com.example.webservice.entities.Question;
import com.example.webservice.entities.Test;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Path("/test")
public class TestResource {
    private static final List<Test> tests = new ArrayList<>();

    public TestResource() {
        if (tests.isEmpty()) {
            tests.add(new Test(1, 1, 1, "Mein Test", "beschreibung",
                    new Question[]{new Question(1, "Name", "Descritpion", "Hint", 0,
                            new Answer[]{new Answer(1, "Answerdesc", true, "true"),
                                    new Answer(2, "ZHweite", false, "")})}));
        }
    }

    @GET
    @Path("/alletests")
    @Produces(MediaType.APPLICATION_JSON)
    public Response ladeAlleTests() {
        tests.sort(Comparator.comparing(Test::getId));
        return Response.ok(tests).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{testid}")
    public Response getTest(@PathParam("testid") int testid) {
        Test result = tests.stream().filter(test -> test.getId() == testid).findFirst().orElse(null);

        return Response.ok(result).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTest(Test testParam) {
        Test testFound = tests.stream().filter(test -> test.getId() == testParam.getId()).findFirst().orElse(null);
        if (testFound != null) {
            return Response.status(Response.Status.CONFLICT).build();
        }

        tests.add(testParam);

        return Response.ok(testParam).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTest(Test testParam) {
        tests.stream().filter(test -> test.getId() == testParam.getId()).findFirst().ifPresent(tests::remove);
        tests.add(testParam);

        return Response.ok(testParam).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{testid}")
    public Response deleteTest(@PathParam("testid") int testid) {
        Test testResponse = tests.stream().filter(test -> test.getId() == testid).findFirst().orElse(null);
        if (testResponse != null) {
            tests.remove(testResponse);
        }

        return Response.ok(testResponse).build();
    }
}