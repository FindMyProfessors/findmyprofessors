import 'package:flutter/material.dart';
import 'package:app/themes/theme.dart';
import 'package:app/widgets/custom_scaffold.dart';
import 'package:icons_plus/icons_plus.dart';
import 'package:app/screens/signup_screen.dart';
import 'package:app/screens/forgot_password_screen.dart';
import 'package:app/screens/dashboard/dashboard.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState(); 
}
 
class _SignInScreenState extends State<SignInScreen> {

  final _formSignInKey = GlobalKey<FormState>();
  bool rememberPassword = true;
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();


  Future<void> _signInUser() async {
   print('Registering new user... ' + _nameController.text + ' ' + _passwordController.text);
    
  try {
    var response = await http.post(
      Uri.parse('http://localhost:8080/auth/login'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'username': _nameController.text,
        'password': _passwordController.text,
      }),
    );

    print("Response status: ${response.statusCode}");
    print("Response headers: ${response.headers}");
    print("Response body: ${response.body}");

    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {

      final String username = responseData['user']['username'];
      final int id = responseData['user']['id'];

      await storage.write(key: 'JWT', value: responseData['token']);
      await storage.write(key: 'userName', value: username);
      await storage.write(key: 'id', value: id.toString());  //saved as a string NOT an int

      print('User registered: '+ username + ' ID: ' + id.toString());

      Navigator.of(context).push(MaterialPageRoute(builder: (context) => Dashboard()));
    } 
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(responseData['message']),
        ),
      );
      print('Failed to Sign user: ${response.body[0]}');
    }
  } 
  catch (e) {
    print('ERROR occurred: $e');
  }
  }

  @override
  Widget build(BuildContext context) {
    return  CustomScaffold(showAppBar: true,


      child: Column(  
        children: [
          const Expanded(flex: 1, child: SizedBox(height: 10,)),

          Expanded(
            //was changed fron 7 to 12
            flex: 9,
            child: Container(
              padding:  const EdgeInsets.fromLTRB(20.0, 50, 20, 20),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40),
                topRight: Radius.circular(40),
              ),
            ),
          
            child: SingleChildScrollView(
              child: Form(
                key: _formSignInKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
              
                    const Text(
                      'Welcome back!',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Colors.black
                      ),
                    ),
              
                    const SizedBox(height: 30), 
                    
                    TextFormField(
                        controller: _nameController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter Username';
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
                        controller: _passwordController,
                        obscureText: true,
                        obscuringCharacter: '*',
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter Password';
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Checkbox(
                              value: rememberPassword,
                              onChanged: (bool? value) {
                                setState(() {
                                  rememberPassword = value!;
                                });
                              },
                              activeColor: lightColorScheme.primary,
                            ),
                            const Text(
                              'Remember me',
                              style: TextStyle(
                                color: Colors.black
                              ),
                            )
                          ],
                        ),
              
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (e) => const ForgotPasswordScreen(),
                              ),
                              );
                            },
                          child: Text(
                            'Forgot Password?',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: lightColorScheme.primary
                            ),
                          ),
                        )
                      ],
                    ),
              
                    const SizedBox(height: 20),
              
                    SizedBox(
                      width: double.infinity,
                      //height: 50,
                      child: ElevatedButton(
                        onPressed: () {
                          if (_formSignInKey.currentState!.validate()) {
                            _signInUser();
                          }
                        },
                        child: const Text('Sign In'),
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
                    
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                          
                        //bypass log in by clicking on github
                          IconButton(
                            icon: Icon(
                              Bootstrap.github, // Replace with Bootstrap GitHub icon
                              size: 35, // Adjust size as needed
                            ),
                            onPressed: () {
                              // Navigate to another screen
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => Dashboard()),
                              );
                            },
                          ),


                          //Icon(Bootstrap.github,size: 35,),
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
                            'Don\'t have an account? ',
                            style: TextStyle(
                              color: Colors.black45,
                            ),
                          ),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (e) => const SignUpScreen(),
                                ),
                              );
                            },
                            child: Text(
                              'Sign Up',
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
