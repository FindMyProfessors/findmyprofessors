import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(UniversityClassesApp());
}

class UniversityClassesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Classes Shopping Cart',
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

class _ShoppingCartPageState extends State<ShoppingCartPage> {
  List<String> availableClasses = [];
  final List<String> cart = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchClasses();
  }

  Future<void> fetchClasses() async {
    final response = await http.get(Uri.parse('https://api.example.com/classes'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      setState(() {
        availableClasses = data.map((item) => item['name'] as String).toList();
        isLoading = false;
      });
    } else {
      throw Exception('Failed to load classes');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('University Classes Shopping Cart'),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: availableClasses.length,
                    itemBuilder: (context, index) {
                      final course = availableClasses[index];
                      return ListTile(
                        title: Text(course),
                        trailing: IconButton(
                          icon: Icon(Icons.add),
                          onPressed: () {
                            setState(() {
                              if (!cart.contains(course)) {
                                cart.add(course);
                              }
                            });
                          },
                        ),
                      );
                    },
                  ),
                ),
                Divider(),
                Text(
                  'Your Cart',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: cart.length,
                    itemBuilder: (context, index) {
                      final course = cart[index];
                      return ListTile(
                        title: Text(course),
                        trailing: IconButton(
                          icon: Icon(Icons.remove),
                          onPressed: () {
                            setState(() {
                              cart.remove(course);
                            });
                          },
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: ElevatedButton(
                    onPressed: () {
                      if (cart.isNotEmpty) {
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
                    },
                    child: Text('Checkout'),
                  ),
                ),
              ],
            ),
    );
  }
}