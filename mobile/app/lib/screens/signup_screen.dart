import 'package:app/screens/dashboard.dart';
import 'package:flutter/material.dart';
import 'package:app/screens/signin_screen.dart';
import 'package:app/widgets/custom_scaffold.dart';
import 'package:app/themes/theme.dart';
import 'package:icons_plus/icons_plus.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignInScreenState(); 
}
 
class _SignInScreenState extends State<SignUpScreen> {

  final _formSignUpKey = GlobalKey<FormState>();
  bool agreePersonalData = false;
  final TextEditingController _nameController = TextEditingController(); // Added controller for username
  final TextEditingController _emailController = TextEditingController(); // Added controller for email
  final TextEditingController _passwordController = TextEditingController(); // Added controller for password
  
   Future<void> _registerUser() async {
   print('Registering new user... ' + _emailController.text + ' ' + _nameController.text + ' ' + _passwordController.text);
    
  try {
    var response = await http.post(
      Uri.parse('http://localhost:8080/auth/register'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'email': _emailController.text,
        'username': _nameController.text,
        'password': _passwordController.text,
      }),
    );

    print("Response status: ${response.statusCode}");
    print("Response headers: ${response.headers}");
    print("Response body: ${response.body}");

    final responseData = json.decode(response.body);

    if (response.statusCode == 201) {
      print('User registered: ${responseData['user']}');
      Navigator.of(context).push(MaterialPageRoute(builder: (context) => SignInScreen()));
    } 
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(responseData['message']),
        ),
      );
      print('Failed to register user: ${response.body[0]}');
    }
  } 
  catch (e) {
    print('ERROR occurred: $e');
  }
  }

  bool validateEmail(String email) {
  // Regular expression for a basic email validation
  final RegExp emailRegex = RegExp(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  );

  // Check if the email matches the regular expression
  return emailRegex.hasMatch(email);
}
  String validatePassword(String password) {
    // Regular expressions for different requirements
    final RegExp hasUppercase = RegExp(r'(?=.*[A-Z])');
    final RegExp hasLowercase = RegExp(r'(?=.*[a-z])');
    final RegExp hasDigit = RegExp(r'(?=.*\d)');
    final RegExp hasSpecialChar = RegExp(r'(?=.*[@$!%*?&])');

    // List to collect missing requirements
    List<String> missingRequirements = [];

    // Check each requirement and add to the list if missing
    if (password.length < 8) {
      missingRequirements.add('\n\t\t\t\t\t\tat least 8 characters long');
    }
    if (password.length >= 50) {
      missingRequirements.add('\n\t\t\t\t\t\tat most 50 characters long');
    }
    if (!hasUppercase.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain an uppercase letter');
    }
    if (!hasLowercase.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a lowercase letter');
    }
    if (!hasDigit.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a digit');
    }
    if (!hasSpecialChar.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a special character');
    }

    // Return the missing requirements or a success message
    if (missingRequirements.isEmpty) {
      return '';
    } else {
      return missingRequirements.join();
    }
}

  String validateUsername(String username) {

    List<String> missingRequirements = [];
    if (username.length < 5 || username.length > 16) {
      missingRequirements.add("\n\t\t\t\t\t\tMust be between 5 and 16 characters");
    }

    final regex = RegExp(r'^[a-z0-9_]+$');
    if (!regex.hasMatch(username)) {
      missingRequirements.add("\n\t\t\t\t\t\tOnly contain letters, digits, and underscores");
    }

    //NO uppercase
    if (username.contains(RegExp(r'[A-Z]'))) {
      missingRequirements.add("\n\t\t\t\t\t\tUsername cannot contain uppercase letters");
    }

    if (username.contains(' ')) {
      missingRequirements.add("\n\t\t\t\t\t\tUsername cannot contain spaces.");
    }

    if (missingRequirements.isEmpty) {
      return '';
    } 
    else {
    return missingRequirements.join();
    }
  }
  //our privacy policy
  void _showPrivacyPolicyDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Privacy Policy'),
          content: const SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('We dont actually have a privacy policy, your personal data is at major risk of being used for horrribly illegal activities. We are not responsible for any irreparable, horrific damgages that may come to you and your loved ones as a result of using this app. The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.'),
                // Add more content here if needed
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Close', style: TextStyle(color: lightColorScheme.primary),),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(showAppBar: true,

      child: Column(  
        children: [
          const Expanded(flex: 1, child: SizedBox(height: 10,)),

          Expanded(
            //was changed fron 7 to 12
            flex: 9,
            child: Container(
              padding:  const EdgeInsets.fromLTRB(20.0, 40, 20, 20),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40),
                topRight: Radius.circular(40),
              ),
            ),
          
            child: SingleChildScrollView(
              child: Form(
                key: _formSignUpKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
              
                    const Text(
                      'Sign Up',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Colors.black
                      ),
                    ),
              
                    const SizedBox(height: 30), 
                    
                    TextFormField(
                        controller: _nameController, // Assigning controller
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter Username';
                          }

                          String validationResult = validateUsername(value);
                          if (validationResult != '') {
                            return 'Username requirements:${validationResult}';
                          }  

                          return null;
                        },
                        decoration: InputDecoration(
                          
                          label: const Text('Username'), 
                          hintText: 'Username',
                          hintStyle: const TextStyle(color: Colors.grey),
              
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
                        )
                    ),

                    const SizedBox(height: 20),

                    TextFormField(
                        controller: _emailController, // Assigning controller
                        validator: (value) {
                          if (!validateEmail(value!)) {
                            return 'Please enter a valid Email';
                          }
                          return null;
                        },
                        decoration: InputDecoration(
                          
                          label: const Text('Email'), 
                          hintText: 'Email',
                          hintStyle: const TextStyle(color: Colors.grey),
              
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
                        )
                    ),
              
                    const SizedBox(height: 20), 
              
                    TextFormField(
                        controller: _passwordController, // Assigning controller
                        obscureText: true,
                        obscuringCharacter: '*',
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter Password';
                          }

                          String validationResult = validatePassword(value);
                          if (validationResult != '') {
                            return 'Password requirements: ${validationResult}';
                          }  
                            return null;
                        },
              
                        decoration: InputDecoration(
                          
                          label: const Text('Password'), 
                          hintText: 'Passwrord',
                          hintStyle: const TextStyle(color: Colors.grey),
              
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
                        )
                    ),
                    
                    const SizedBox(height: 20), 
              
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Row(
                          children: [
                            Checkbox(
                              value: agreePersonalData,
                              onChanged: (bool? value) {
                                setState(() {
                                  agreePersonalData = value!;
                                });
                              },
                              activeColor: lightColorScheme.primary,
                            ),
                            const Text(
                              'I have read and agreee with the ',
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 12,
                              ),
                            )
                          ],
                        ),
              
                        GestureDetector(
                          onTap: (){
                            _showPrivacyPolicyDialog(context);
                          },
                          child: Text(
                            'Privacy Policy',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                              color: lightColorScheme.primary
                            ),
                          ),
                        )
                      ],
                    ),
              
                    const SizedBox(height: 20),
              
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () {
                          
                          if(!agreePersonalData) {
                            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please agree to the Privacy Policy to proceed.')));
                          }
                          if (_formSignUpKey.currentState!.validate()) {
                            _registerUser();
                          }
                        },
                        child: const Text('Sign Up'),
                      ),
                    ),

                    const SizedBox(height: 20),

                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Divider(
                            thickness: 0.5,
                            color: Colors.grey
                          )
                        ),

                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10, vertical: 0),
                          child: Text('Check Out', style: TextStyle(color: Colors.grey),),
                        ),

                        Expanded(
                          child: Divider(thickness: 0.5, color: Colors.grey)
                        ),
                        
                      ],
                    ),

                    const SizedBox(height: 30),   
                    
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                          //Icon(Bootstrap.google,size: 35,),
                          Icon(Bootstrap.github,size: 35,),
                          Icon(Bootstrap.facebook,size: 35, color: Color.fromRGBO(66, 103, 178, 1.0),),
                          Icon(Bootstrap.twitter,size: 35, color: Color.fromRGBO(29, 161, 242, 1.0),),
                          Icon(Bootstrap.instagram,size: 35, color: Colors.pink,),
                          //Icon(Bootstrap.apple,size: 35,),
                      ],
                    ),
                    
                    const SizedBox(height: 40),

                    Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            'Already have an account? ',
                            style: TextStyle(
                              color: Colors.black45,
                            ),
                          ),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (e) => const SignInScreen(),
                                ),
                              );
                            },
                            child: Text(
                              'Sign In',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: lightColorScheme.primary,
                              ),
                            ),
                          ),
                        ],
                      ),
                  ]
                ),
              ),
            ),
          ))
        ]
      )
    );
  }
}
