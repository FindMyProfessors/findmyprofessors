import 'package:flutter/material.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/API_services/API.dart';

Future<void> showFilterDialog({
  required BuildContext context,
  required Function setState,
}) async {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shadowColor: Colors.black,
        scrollable: true,
        title: Text('Enter School Info'),
        content: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              SizedBox(height: 10.0),
              Autocomplete<Name_ID>(
                optionsBuilder: (TextEditingValue textEditingValue) {
                  if (textEditingValue.text.isEmpty) {
                    return const Iterable<Name_ID>.empty();
                  }
                  return schoolNames!.where((Name_ID pair) {
                    return pair.Name.toLowerCase().contains(textEditingValue.text.toLowerCase());
                  });
                },
                displayStringForOption: (Name_ID option) => option.Name,
                fieldViewBuilder: (BuildContext context, TextEditingController textEditingController, FocusNode focusNode, VoidCallback onFieldSubmitted) {
                  return TextFormField(
                    controller: textEditingController,
                    focusNode: focusNode,
                    decoration: InputDecoration(
                      labelText: "School Name",
                      hintText: "Enter school name",
                      border: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  );
                },
                onSelected: (Name_ID selection) {
                  setState(() {
                    schoolSelection = selection;
                  });
                  print('You just selected ${schoolSelection.Name} with ID ${selection.ID}');
                },
              ),
              SizedBox(height: 15.0),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(
                  labelText: "Semester",
                  hintText: "Select Semester",
                  isDense: true,
                  border: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.black),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.black),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                items: [
                  DropdownMenuItem<String>(
                    child: Text("spring"),
                    value: "spring",
                  ),
                  DropdownMenuItem<String>(
                    child: Text("summer"),
                    value: "summer",
                  ),
                  DropdownMenuItem<String>(
                    child: Text("fall"),
                    value: "fall",
                  ),
                ].toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    semesterSelection = newValue!;
                  });
                },
              ),
              SizedBox(height: 15.0),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(
                  labelText: "Year",
                  hintText: "Select Year",
                  isDense: true,
                  border: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.black),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.black),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                items: [
                  DropdownMenuItem<String>(
                    child: Text("2024"),
                    value: "2024",
                  ),
                  DropdownMenuItem<String>(
                    child: Text("2025"),
                    value: "2025",
                  ),
                ].toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    year = newValue!;
                  });
                },
              ),
            ],
          ),
        ),
        actions: <Widget>[
          TextButton(
            child: Text('Cancel'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
          ElevatedButton(
            child: Text('Save'),
            onPressed: () {
              print('SELECTED FILTERS: School Name: ${schoolSelection.ID}, Semester: $semesterSelection, Year: $year');
              getCourses(context);
             
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}
