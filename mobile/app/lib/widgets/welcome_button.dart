import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class WelcomeButton extends StatelessWidget {
  const WelcomeButton({super.key, required this.buttonText, required this.onTap, required this.color, required this.textColor});

  final String buttonText;
  final Widget onTap;
  final Color color;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (e) => onTap,
          ),
        );
      },
      child: Container(

        padding: const EdgeInsets.all(20.0),
        
        decoration: BoxDecoration(
          color: color,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(50),
            topRight: Radius.circular(50),
            bottomLeft: Radius.circular(50),
            bottomRight: Radius.circular(50),
          ),
        ),
      
        child: Text(
          buttonText,
          textAlign: TextAlign.center,
        style: TextStyle(color: textColor, fontSize: 20.0, fontWeight: FontWeight.bold ),
        ),
        
        
        ),
    );
  }
}