import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

void main() {
  runApp(UniversityClassesApp());
}

class UniversityClassesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'University Classes Shopping Cart',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ShoppingCartPage(),
    );
  }
}

class ShoppingCartPage extends StatefulWidget {
  @override
  _ShoppingCartPageState createState() => _ShoppingCartPageState();
}

Future<void> getCart(BuildContext context) async {
  print("Loading User SCHOOLS to Dashboard...");
  String? JWT = await storage.read(key: 'JWT');
  try {
    var response = await http.post(
      Uri.parse('https://findmyprofessors-api.warrensnipes.dev/users/'+storage+'/cart'),
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    );

    print("Response status: ${response.statusCode}");
    print("Response headers: ${response.headers}");
    print("Response body: ${response.body}");

    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      print("successfull cart search");
        Cart = [];
        final List<dynamic> course_cart = responseData['cart_courses'];

        for (var professor in course_cart) {
          final String course_id = professor['first_name'] + ' ' + professor['last_name'];
          final int professorID = professor['id'];
          Cart?.add(new Name_ID(professorID, course_id));
        }
    } 
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(responseData['message']),
        ),
      );
      print('Failed to Load Schools: ${response.body[0]}');
    }
  } 
  catch (e) {
    print('ERROR occurred: $e');
  }
}

class _ShoppingCartPageState extends State<ShoppingCartPage> {
  final List<String> cart = [
    'Math 101',
    'History 202',
    'Biology 303'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Your Classes'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Classes in Your Cart',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blue[800]),
            ),
          ),
          Divider(),
          Expanded(
            child: ListView.builder(
              itemCount: cart.length,
              itemBuilder: (context, index) {
                final course = cart[index];
                return Card(
                  margin: EdgeInsets.symmetric(vertical: 10, horizontal: 16),
                  elevation: 3,
                  child: ListTile(
                    title: Text(course, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500)),
                    trailing: IconButton(
                      icon: Icon(Icons.remove_circle, color: Colors.red),
                      onPressed: () {
                        setState(() {
                          cart.removeAt(index);
                        });
                      },
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton(
              onPressed: cart.isNotEmpty
                  ? () {
                      showDialog(
                        context: context,
                        builder: (context) {
                          return AlertDialog(
                            title: Text('Checkout Successful'),
                            content: Text('You have registered for ${cart.length} classes.'),
                            actions: [
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pop();
                                },
                                child: Text('OK'),
                              ),
                            ],
                          );
                        },
                      );
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue[700], // background color
                foregroundColor: Colors.white, // text color
                padding: EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                textStyle: TextStyle(fontSize: 18),
              ),
              child: Text('Checkout'),
            ),
          ),
        ],
      ),
    );
  }
}
