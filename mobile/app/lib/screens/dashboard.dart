
import 'package:app/screens/Professor.dart';
import 'package:app/widgets/sideMenu.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({ Key? key }) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {

final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
String schoolName = "School Name";
String semester = 'Semester';
DateTime now = DateTime.now();
String year = "2024";

void _showFilter() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Enter School Info'),
          content: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                SizedBox(height: 10.0),

                TextFormField(
                  decoration: InputDecoration(                    
                    labelText: "School Name",
                    hintText: schoolName,
                    //hintStyle: const TextStyle(color: Colors.grey),
        
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
        
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    )
                  ),

                  onChanged: (value) {
                    schoolName = value;
                  },
                ),

                SizedBox(height: 15.0),

                TextFormField(
                  decoration: InputDecoration(                    
                    labelText: "Semester",
                    hintText: semester,
                    //hintStyle: const TextStyle(color: Colors.grey),
        
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
        
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    )
                  ),
                  onChanged: (value) {
                    semester = value;
                  },
                ),

                SizedBox(height: 15.0),
                
                TextFormField(
                  decoration: InputDecoration(                    
                    labelText: "Year",
                    hintText: year,
                    //hintStyle: const TextStyle(color: Colors.grey),
        
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
        
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(10),
                    )
                  ),
                  onChanged: (value) {
                    year = value;
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
                print('School Name: $schoolName, Semester: $semester');
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
                    
                    Text("UserName", style: TextStyle(color: Colors.white, fontSize: 20.0)),
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
            margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
            padding: EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Color(0xff17203a),
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: Text(
              professors[index],
              style: TextStyle(color: Colors.white, fontSize: 18.0),
            ),
          )
        );
      },
    ),
  );
}
  
}