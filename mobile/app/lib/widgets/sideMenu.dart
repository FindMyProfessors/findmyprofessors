import 'package:app/screens/dashboard.dart';
import 'package:app/screens/welcome_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

class SideMenu extends StatefulWidget {
  const SideMenu({ Key? key }) : super(key: key);

  @override
  _SideMenuState createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  String? userName;

  void initState() {
    super.initState();
    //_loadUserName();
    _loadUserValues();
  }

  final storage = FlutterSecureStorage();

Future<void> _loadUserValues() async {
  String? name = await storage.read(key: 'userName');
  setState(() {
      userName = name;
    });
  //print(' Side Menu Username: $name');
}
  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Color(0xff17203a),
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            child: Row(
              children: <Widget>[
                CircleAvatar(
                  backgroundImage: AssetImage('assets/images/splash_icon.png'),
                  radius: 25.0,
                ),

                SizedBox(width: 10.0),

                Text(userName ?? 'User', style: TextStyle(color: Colors.white, fontSize: 20.0)),
                
              ],
            ),
            
            decoration: BoxDecoration(
                //borderRadius: BorderRadius.circular(30.0),
                color:Color(0xff17203a),
            ),
          ),

          
          ListTile(
            leading: Icon(Icons.dashboard_customize_rounded, color: Colors.white,),
            title: Text('DashBoard', style: TextStyle(color: Colors.white),),
            onTap: () =>   {Navigator.of(context).pop()},
          ),

          Divider(color: Colors.black, thickness: 1.0),

          ListTile(
            leading: Icon(Icons.shopping_cart, color: Colors.white),
            title: Text('Course Cart' , style: TextStyle(color: Colors.white)),
            onTap: () => {Navigator.of(context).pop()},
          ),

          Divider(color: Colors.black, thickness: 1.0),

          ListTile(
            leading: Icon(Icons.person, color: Colors.white),
            title: Text('Profile' , style: TextStyle(color: Colors.white)),
            onTap: () => {Navigator.of(context).pop()},
          ),

          Divider(color: Colors.black, thickness: 1.0),

          ListTile(
            leading: Icon(Icons.settings , color: Colors.white),
            title: Text('Settings' , style: TextStyle(color: Colors.white)),
            onTap: () => {Navigator.of(context).pop()},
          ),

          Divider(color: Colors.black, thickness: 1.0),

          ListTile(
            leading: Icon(Icons.exit_to_app , color: Colors.white),
            title: Text('Logout' , style: TextStyle(color: Colors.white)),
            onTap: () async => {
              //clerar storage of proffessors
              Professors = [],
              //delete user info
              await storage.deleteAll(),

              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => WelcomeScreen()),
                (Route<dynamic> route) => false,
              ),
              //print("Token "+ (await storage.read(key: 'JWT')).toString())

              },
          ),
        ],
      ),
    );
  }
}