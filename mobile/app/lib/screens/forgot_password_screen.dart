import 'package:flutter/material.dart';
import 'package:app/widgets/custom_scaffold.dart';


class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _SignInScreenState(); 
}
 
class _SignInScreenState extends State<ForgotPasswordScreen> {

  final _formSignUpKey = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController(); // Added controller for email

  bool validateEmail(String email) {
    // Regular expression for a basic email validation
    final RegExp emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    );

    // Check if the email matches the regular expression
    return emailRegex.hasMatch(email);
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
              width: double.infinity,
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
                key: _formSignUpKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [

                    SizedBox(height: 20),

                    const Text(
                      'Forgot Password?',
                      style: TextStyle(
                        color:  Color.fromARGB(255, 65, 68, 232),
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    const SizedBox(height: 20),

                    Container(
                      height: 65,
                      width: 250,
                      child: 
                      const Text(
                      'No worries! Just enter your email address and we will send you a link to reset your password.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 14),
                      ),
                    ),

                    const SizedBox(height: 25),

                    Container(
                      width: 300,
                      child: 
                      Column(
                        children: [
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

                        SizedBox(height: 30),

                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: () {
                              if (_formSignUpKey.currentState!.validate()) {
                                // Send email to user
                                print("Email: " + _emailController.text);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Email sent'),
                                  ),
                                );
                              } else {
                                print("Email not valid");
                              }
                            },
                            child: const Text('Send'),
                          ),
                        ),
                      
                        ]
                      )
                      

                    )
                  ]
                ),
                

              ),
              
            )
            
          )
          )
        ]
      )
    );
  }
}
