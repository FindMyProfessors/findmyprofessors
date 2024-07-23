import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;

  static final List<Widget> _widgetOptions = <Widget>[
    const TextTablePage(),
    const SearchPage(),
    /*const*/AccountPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hello [name]'),
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.table_chart),
            label: 'Your Professors',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.pageview),
            label: 'Course Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_box),
            label: 'Account',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}

class TextTablePage extends StatelessWidget {
  const TextTablePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(8.0),
      children: <Widget>[
        Table(
          border: TableBorder.all(),
          children: const [
            TableRow(children: [
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Your Professors'),
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Times'),
              ),
            ]),
            TableRow(children: [
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Dr. Smith'),
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Thu 3pm'),
              ),
            ]),
            TableRow(children: [
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Bill'),
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('Wed 1pm'),
              ),
            ]),
          ],
        ),
      ],
    );
  }
}

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String query = '';
  final List<String> data = [//IMPORT COURSE LIST
    'Course 1',
    'Course 2',
    'Course 3',
    'Course 4',
    'Course 5',
    'Course 6',
    'Course 7',
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            onChanged: (value) {
              setState(() {
                query = value;
              });
            },
            decoration: InputDecoration(
              hintText: 'Search...',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.0),
              ),
              prefixIcon: const Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: ListView(
            children: data
                .where((item) => item.toLowerCase().contains(query.toLowerCase()))
                .map((item) => ListTile(
                      title: Text(item),
                    ))
                .toList(),
          ),
        ),
      ],
    );
  }
}

class AccountPage extends StatefulWidget {
  @override
  _AccountPageState createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  String _selectedUniversity = "UCF";

  final List<String> _universities = [
    "Harvard University",
    "Stanford University",
    "MIT",
    "University of Oxford",
    "University of Cambridge",
    "UCF",
  ];

  @override
  void initState() {
    super.initState();
    /*final userProfile = Provider.of<UserProfile>(context, listen: false);
    _nameController.text = userProfile.name;
    _emailController.text = userProfile.email;
    _selectedUniversity = userProfile.university;*/
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _saveForm() {
    if (_formKey.currentState!.validate()) {
      /*final userProfile = Provider.of<UserProfile>(context, listen: false);
      userProfile.updateName(_nameController.text);
      userProfile.updateEmail(_emailController.text);
      userProfile.updateUniversity(_selectedUniversity);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Profile updated')),
      );*/
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Account Page'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == "") {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _emailController,
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == "") {
                    return 'Please enter your email';
                  } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value!)) {
                    return 'Please enter a valid email address';
                  }
                  return null;
                },
              ),
              DropdownButtonFormField(
                value: _selectedUniversity,
                items: _universities.map((String university) {
                  return DropdownMenuItem(
                    value: university,
                    child: Text(university),
                  );
                }).toList(),
                onChanged: (newValue) {
                  setState(() {
                    _selectedUniversity = newValue!;
                  });
                },
                decoration: InputDecoration(labelText: 'University'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _saveForm,
                child: Text('Save'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
