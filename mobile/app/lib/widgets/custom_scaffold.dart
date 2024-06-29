import 'package:flutter/material.dart';
import 'package:app/screens/welcome_screen.dart';

class CustomScaffold extends StatelessWidget {
  const CustomScaffold({super.key, required this.showAppBar, required this.child});
final bool showAppBar;
final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(

        appBar: showAppBar 
        ? AppBar( 
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.transparent, 
          elevation: 0,

          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const WelcomeScreen()),
              );
            },
          ),
        )
        :null,

        extendBodyBehindAppBar: true,
        
        body: Stack(children: [
          
          Image.asset(
            'assets/images/bg_home.jpg',
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
          ),


          SafeArea(
            child: child,
          ),]

      )
    );
  }

}