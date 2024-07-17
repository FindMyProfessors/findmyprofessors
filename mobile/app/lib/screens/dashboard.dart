
import 'package:app/screens/Professor.dart';
import 'package:app/widgets/sideMenu.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


final storage = new FlutterSecureStorage();

class Dashboard extends StatefulWidget {
  const Dashboard({ Key? key }) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  String schoolSelection = "School Name";
  String semesterSelection = 'Semester';
  DateTime now = DateTime.now();
  String year = "2024";
  String? userName;
  String? userID;

  List<String>? schoolNames= [];
  final List<String>? semesterNames= ['fall','spring','summer'];

  Future<void> _getSchools() async {
    print("Loading User SCHOOLS to Dashboard...");
    String? JWT = await storage.read(key: 'JWT');
    try {
      var response = await http.get(
        //currently searching for school with name "u" must change 
        Uri.parse('http://localhost:8080/schools/search/u?pageSize=10'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JWT.toString(),
        },
      );

      print("Response status: ${response.statusCode}");
      print("Response headers: ${response.headers}");
      print("Response body: ${response.body}");

      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        print("successfull school search");
        final List<dynamic> Schools = responseData['edges'];
        //itterate through edges
        for (var school in Schools) {
          final String schoolName = school['node']['name'];
          schoolNames?.add(schoolName);
        }

        if (schoolNames != null) {
        for (String schoolName in schoolNames!) {
          print('School: $schoolName');
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

  @override
  void initState() {
    super.initState();
    _loadUserValues();
    _getSchools();
  }

  final storage = FlutterSecureStorage();

  Future<void> _loadUserValues() async {
    print("Loading User Values on Dashboard...");
    String? token = await storage.read(key: 'JWT');
    String? name = await storage.read(key: 'userName');
    String? id = await storage.read(key: 'id');
    setState(() {
      userName = name;
      userID= id;
    });

    print('JWT Token: $token');
    print('Username: $name');
    print('ID: $id');
  }

  void _showFilter() {
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

                Autocomplete<String>(
                  optionsBuilder: (TextEditingValue textEditingValue) {
                    if (textEditingValue.text.isEmpty) {
                      return const Iterable<String>.empty();
                    }
                    return schoolNames!.where((String option) {
                      return option.toLowerCase().contains(textEditingValue.text.toLowerCase());
                    });
                  },
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
                  onSelected: (String selection) {
                    print('You just selected $selection');
                    schoolSelection = selection;
                    //Navigator.of(context).pop();
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
                      child:
                      Text("spring"),
                      value: "spring",
                    ),
                    DropdownMenuItem<String>(
                      child:Text("summer"),
                      value: "summer",
                    ),
                    DropdownMenuItem<String>(
                      child:Text("fall"),
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
                      child:
                      Text("2024"),
                      value: "2024",
                    ),
                    DropdownMenuItem<String>(
                      child:Text("2025"),
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
                // Process the input here (e.g., save to database)
                print('School Name: $schoolSelection, Semester: $semesterSelection, Year: $year');
                Navigator.of(context).pop(); // Close the dialog
              },
            ),
          ],
        );
      }
    );
  }

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        key: _scaffoldKey,
        drawer: SideMenu(),
        body: Column(
          // crossAxisAlignment: CrossAxisAlignment.start,
          // mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            _top(),

            SizedBox(height: 20.0),

            Padding(
              padding: EdgeInsets.only(bottom: 15.0, left: 16.0, right: 16.0),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text("Professors", 
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 20.0),
                  ),

                ]
              ),

            ),

            Divider(color: Colors.black, thickness: 1.0, indent: 16.0, endIndent: 16.0,),

            _professors(),


          ],
        ),
      );
    }

    //top bar
    _top() {
      return Container(
        padding: EdgeInsets.all(16.0),
        decoration: BoxDecoration( 
          color: Color(0xff17203a), 
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(30.0),
            bottomRight: Radius.circular(30.0))
        ),

        child: Column(
          
          children: <Widget>[
            SizedBox(height: 25.0),
            //top row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget> [
                IconButton(
                  onPressed: () {
                  _scaffoldKey.currentState?.openDrawer();
                  }, 
                  icon: Icon(
                    size: 33.0,
                    Icons.menu, 
                    color: Colors.white,)
                  ),
                  Row(
                  children: <Widget>[
                      
                      Text(userName ?? 'User', style: TextStyle(color: Colors.white, fontSize: 20.0)),
                      SizedBox(width: 10.0),

                      CircleAvatar(
                        backgroundImage: AssetImage('assets/images/splash_icon.png'),
                        radius: 25.0,
                      ),


                  ]
                ),
              ],
            
            ),

            SizedBox(height: 15.0),
            //search box
            TextField(
              decoration: InputDecoration(
                hintText: "Search Course",
                fillColor: Colors.white,
                filled: true,
                suffixIcon: IconButton(
                  onPressed: _showFilter, 
                  icon: Icon(
                    Icons.filter_list,
                    )
                  ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25.0),
                  borderSide: BorderSide(color: Colors.transparent),
                ),

                contentPadding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
                
              )
            ),
            SizedBox(height: 5.0),
          ]
        )
      );
    }

    List<String> professors = List.generate(10, (index) => 'Professor ${index + 1}');
    
    _professors() {

    return Expanded(
      child: ListView.builder(
        itemCount: professors.length,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (context) => Professor(item: "${index + 1}", rating: (index+1)%5,)));
            },
            child: Container(
              height: 100.0,
              margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Color(0xff17203a),
                borderRadius: BorderRadius.circular(10.0),
              ),

              child: Column(
                
                children: [
                  SizedBox(height: 5.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(
                        professors[index],
                        style: TextStyle(color: Colors.white, fontSize: 18.0),
                      ),

                      RatingBar.builder(
                        ignoreGestures: true,
                        itemSize: 20.0,
                        initialRating: index.toDouble()%5+1,
                        minRating: 0,
                        direction: Axis.horizontal,
                        //allowHalfRating: true,
                        itemCount: 5,
                        itemPadding: EdgeInsets.symmetric(horizontal: 0.0),
                        itemBuilder: (context, _) => Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        onRatingUpdate: (rating) {
                          print(rating);
                        },
                      ),
                    ],
                  ),

                  SizedBox(height: 10.0),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                    Text(
                    "Course Name "+index.toString(),
                    style: TextStyle(color: Colors.white, fontSize: 12.0),
                    )
                    ]

                  ),
        
                ]
                

              ),
              
            )
          );
        },
      ),
    );
  }
  
}