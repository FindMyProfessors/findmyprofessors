import 'package:app/API_services/API.dart';
import 'package:app/widgets/sideMenu.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:app/widgets/top_widget.dart';
import 'package:app/widgets/professor_cards.dart';


final storage = new FlutterSecureStorage();


 class Name_ID<int, String> {
  int ID;
  String Name;

  Name_ID(this.ID, this.Name);
}

class professorObject {
  int id;
  String name;
  String rmp_id;

  professorObject({
    required this.id,
    required this.name,
    required this.rmp_id,
  });
}

  final List<String>? semesterNames= ['fall','spring','summer'];

  String? userName;
  String? userID;
  bool showProfessors = false;

  //String schoolID = '';
  String semesterSelection = '';
  String year = '';

  late Name_ID schoolSelection;
  late Name_ID courseSelection;

  //List<String> professors= [];     
 
  //each list has both the name and the ID
  List<Name_ID>? schoolNames= [];
  List<Name_ID> courseCodes = [];
  List<professorObject>? Professors= [];

class Dashboard extends StatefulWidget {
  const Dashboard({ Key? key }) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  
  @override
  void initState() {
    super.initState();
    _loadUserValues();
    getSchools(context);
  }

  void _refreshProfessors() {
    print('Refreshing Professors...');
    setState(() {
      professorsWidget(professors: Professors);
    });
  }
  
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

 
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        key: _scaffoldKey,
        drawer: SideMenu(),
        body: Column(
          // crossAxisAlignment: CrossAxisAlignment.start,
          // mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[

            topWidget(
            context: context,
            scaffoldKey: _scaffoldKey,
            refreshProfessors: _refreshProfessors,
            setState: (fn) => setState(fn),
            ),

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
            
            if(Professors!.isNotEmpty && courseCodes.isNotEmpty)
              professorsWidget(professors: Professors)
            else
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children:
                [
                  SizedBox(height: 30.0),
                  Icon( Icons.search_off_sharp, size: 60.0, color: Colors.black,),
                  SizedBox(height: 30.0),
                  Container(
                    child: Text("No professors found, try changing filters.", style: TextStyle(color: Colors.black),),
                  ),
                ]
              )
              
          ],
        ),
      );
    }  
}