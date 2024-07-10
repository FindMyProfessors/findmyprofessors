
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({ Key? key }) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        // crossAxisAlignment: CrossAxisAlignment.start,
        // mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          _top(),

          SizedBox(height: 20.0),

          Padding(
            padding: EdgeInsets.all(16.0),
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

                Text(
                  "View All", 
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 10.0
                  ),
                ),
              ]
            ),
          ),

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
        color: Colors.blue, 
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(30.0),
           bottomRight: Radius.circular(30.0))
      ),

      child: Column(
        children: <Widget>[
          SizedBox(height: 20.0),
          //top row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget> [
              IconButton(
                onPressed: null, 
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
              suffixIcon: Icon(Icons.filter_list),
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

  _professors() {
  // Generate a list of 10 items (you can replace this with your actual data)
  List<String> professors = List.generate(10, (index) => 'Professor ${index + 1}');

  return Expanded(
    child: ListView.builder(
      itemCount: professors.length,
      itemBuilder: (context, index) {
        return Container(
          margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
          padding: EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: Colors.blue,
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Text(
            professors[index],
            style: TextStyle(color: Colors.white, fontSize: 18.0),
          ),
        );
      },
    ),
  );
  
  //  SingleChildScrollView(
  //   child: Column(
  //     crossAxisAlignment: CrossAxisAlignment.stretch,
  //     children: <Widget>[
  //       ListView.builder(
  //         shrinkWrap: true,
  //         physics: NeverScrollableScrollPhysics(),
  //         itemCount: professors.length,
  //         itemBuilder: (context, index) {
  //           return Container(
  //             margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
  //             padding: EdgeInsets.all(16.0),
  //             decoration: BoxDecoration(
  //               color: Colors.blue,
  //               borderRadius: BorderRadius.circular(10.0),
  //             ),
  //             child: Text(
  //               professors[index],
  //               style: TextStyle(color: Colors.white, fontSize: 18.0),
  //             ),
  //           );
  //         },
  //       ),
  //     ],
  //   ),
  // );
}
  
}