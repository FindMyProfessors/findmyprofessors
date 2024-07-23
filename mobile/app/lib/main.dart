import 'package:flutter/material.dart';
import 'package:app/screens/welcome_screen.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

void main() {
  //spalsh screen for 5 seconds
  FlutterNativeSplash.removeAfter(initializeFunction);
  runApp(const MyApp());
}

//spalsh screen for 5 seconds
Future initializeFunction(BuildContext context) async {
  await Future.delayed(const Duration(seconds: 3));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const WelcomeScreen(),
    );
  }
}
