import 'package:flutter/material.dart';
import '../screens/dashboard.dart';
import 'dart:convert';
import 'package:http/http.dart' as http; 

Future<void> getProfessors(BuildContext context) async {

    print("Loading Professors from DB...");
    
    String? JWT = await storage.read(key: 'JWT');
    try {
      var response = await http.get(
        Uri.parse('http://localhost:8080/courses/'+courseSelection.ID.toString()+'/professors?year='+year+'&semester='+semesterSelection.toUpperCase()),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JWT.toString(),
        },
      );

      // print("Response status: ${response.statusCode}");
      // print("Response headers: ${response.headers}");
      // print("Response body: ${response.body}");

      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        print("successfull professor search");
        Professors = [];
        final List<dynamic> professors_list = responseData['professors'];
        
        for (var professor in professors_list) {
          final String professorName = professor['first_name'] + ' ' + professor['last_name'];
          final int professorID = professor['id'];
          Professors?.add(new Name_ID(professorID, professorName));
        }

        if (Professors != null) {
          for (var professor in Professors!) {
            print('Professor Name: ${professor.Name}, ID: ${professor.ID}');
          }
        } else {
          print('No Professor names found.');
        }
      } 
      else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(responseData['message']),
          ),
        );
        print('Failed to Load Professors: ${response.body[0]}');
      }
    } 
    catch (e) {
      print('ERROR occurred: $e');
    }
  }

Future<void> getCourses(BuildContext context) async {

  print("Loading Courses...");  
  String? JWT = await storage.read(key: 'JWT');
  try {
    var response = await http.get(
      Uri.parse('http://localhost:8080/courses/search?school_id='+schoolSelection.ID.toString()+'&semester='+semesterSelection.toString().toUpperCase()+'&year='+year.toString()+'&pageSize=5000'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JWT.toString(),
      },
    );

    // print("Response status: ${response.statusCode}");
    // print("Response headers: ${response.headers}");
    // print("Response body: ${response.body}");

    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      print("successfull course search");
      courseCodes = [];
      final List<dynamic> Courses = responseData['edges'];
      //itterate through edges
      for (var course in Courses) {
        final String courseCode = course['node']['code'];
        final int courseID = course['node']['id'];
        courseCodes.add(new Name_ID(courseID, courseCode));
      }

      if (courseCodes.isNotEmpty) {
        for (var courseCode in courseCodes) {
          print('Course Code: ${courseCode.Name}, ID: ${courseCode.ID}');
        }
      } else {
        print('No course names found.');
      }
    } 
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(responseData['message']),
        ),
      );
      print('Failed to Load Courses: ${response.body[0]}');
    }
  } 
  catch (e) {
    print('ERROR occurred: $e');
  }
}

Future<void> getSchools(BuildContext context) async {
  print("Loading User SCHOOLS to Dashboard...");
  String? JWT = await storage.read(key: 'JWT');
  try {
    var response = await http.get(
      Uri.parse('http://localhost:8080/schools/search?pageSize=2000'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JWT.toString(),
      },
    );

    // print("Response status: ${response.statusCode}");
    // print("Response headers: ${response.headers}");
    // print("Response body: ${response.body}");

    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      print("successfull school search");
      schoolNames = [];
      final List<dynamic> Schools = responseData['edges'];
      //itterate through edges
      for (var school in Schools) {
        final String schoolName = school['node']['name'];
        final int schoolID = school['node']['id'];
        schoolNames?.add(new Name_ID(schoolID, schoolName));
      }

      if (schoolNames != null) {
      for (var schoolName in schoolNames!) {
        print('School: ${schoolName.Name}, ID: ${schoolName.ID}');
      }
      } else {
        print('No school names found.');
      }
    } 
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(responseData['message']),
        ),
      );
      print('Failed to Load Schools: ${response.body[0]}');
    }
  } 
  catch (e) {
    print('ERROR occurred: $e');
  }
}
