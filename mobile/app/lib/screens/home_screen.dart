import 'package:flutter/material.dart';
import 'package:app/widgets/custom_scaffold.dart';
import 'package:app/widgets/welcome_button.dart';
import 'package:app/screens/signin_screen.dart';
import 'package:app/screens/signup_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      showAppBar: true,
      child: RichText( text: const TextSpan(text:'home SCREEN', style: TextStyle(color: Colors.white,)),),
          
        
      
    );
  }
}
