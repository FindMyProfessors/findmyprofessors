import 'package:flutter/material.dart';
import 'package:app/widgets/custom_scaffold.dart';
import 'package:app/widgets/welcome_button.dart';
import 'package:app/screens/signin_screen.dart';
import 'package:app/screens/signup_screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      showAppBar: false,
      child: Column(
        children: [
          Flexible(
            flex: 1,
            child: Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 40,
                vertical: 20,
              ),
              child: Center(
                child: RichText(
                  textAlign: TextAlign.center,
                  text: const TextSpan(
                    children: [
                      TextSpan(text: 'Find My ', style: TextStyle(color: Colors.white, fontSize: 35, fontWeight: FontWeight.bold)),
                      TextSpan(text: 'Profesors\n', style: TextStyle(color: Color.fromARGB(255, 65, 68, 232), fontSize: 35, fontWeight: FontWeight.bold)),
                      TextSpan(text: '\nBuild your perfect college schedule',style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.normal)),
                    ]
                  ),
                )
              ),
          )),
          
          const Flexible(
            flex: 1,
            
            child: Align( 
              //alignment: Alignment.bottomRight, 
              child: Column(
                children: [
                  SizedBox(height: 150),

                  SizedBox(
                    width: 200, // Set the desired width
                    height: 70, // Set the desired height
                    child: WelcomeButton(
                      buttonText: 'Sign In',
                      onTap: SignInScreen(),
                      color: Color.fromARGB(255, 65, 68, 232),
                      textColor: Colors.white,
                    ),
                  ),

                  SizedBox(height: 20),

                  SizedBox(
                    width: 200, // Set the desired width
                    height: 70, // Set the desired height
                    child: WelcomeButton(
                      buttonText: 'Sign Up',
                      onTap: SignUpScreen(),
                      color: Color.fromARGB(255, 65, 68, 232),
                      textColor: Colors.white,
                    ),
                  ),
                ],
            ))
          )
        ],
      ),
    );
  }
}
