import 'package:flutter/material.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/API_services/dashboard_API.dart';
import 'package:app/widgets/filter_dialog.dart';

Widget topWidget({
  required BuildContext context,
  required GlobalKey<ScaffoldState> scaffoldKey,
  required Function refreshProfessors,
  required Function setState,
}) {
  return Container(
    padding: EdgeInsets.all(16.0),
    decoration: BoxDecoration( 
      color: Color(0xff17203a), 
      borderRadius: BorderRadius.only(
        bottomLeft: Radius.circular(30.0),
        bottomRight: Radius.circular(30.0))
    ),
    child: Column(
      children: <Widget>[
        SizedBox(height: 25.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            IconButton(
              onPressed: () {
                scaffoldKey.currentState?.openDrawer();
              }, 
              icon: Icon(
                size: 33.0,
                Icons.menu, 
                color: Colors.white,
              ),
            ),
            Row(
              children: <Widget>[
                Text(userName ?? 'User', style: TextStyle(color: Colors.white, fontSize: 20.0)),
                SizedBox(width: 10.0),
                CircleAvatar(
                  backgroundImage: AssetImage('assets/images/splash_icon.png'),
                  radius: 25.0,
                ),
              ],
            ),
          ],
        ),
        SizedBox(height: 15.0),
        Autocomplete<Name_ID>(
          optionsBuilder: (TextEditingValue textEditingValue) {
            if (textEditingValue.text.isEmpty) {
              return const Iterable<Name_ID>.empty();
            }
            return courseCodes.where((Name_ID pair) {
              return pair.Name.toLowerCase().contains(textEditingValue.text.toLowerCase());
            });
          },
          displayStringForOption: (Name_ID option) => option.Name,
          fieldViewBuilder: (BuildContext context, TextEditingController textEditingController, FocusNode focusNode, VoidCallback onFieldSubmitted) {
            return TextFormField(
              controller: textEditingController,
              focusNode: focusNode,
              decoration: InputDecoration(
                hintText: "Search Course",
                fillColor: Colors.white,
                filled: true,
                suffixIcon: IconButton(
                  onPressed: () => showFilterDialog(
                        context: context,
                        setState: setState,
                      ),
                  icon: Icon(Icons.filter_list),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25.0),
                  borderSide: BorderSide(color: Colors.transparent),
                ),
                contentPadding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              ),
            );
          },
          onSelected: (Name_ID selection) async {
            setState(() {
              courseSelection = selection;
            });
            await getProfessors(context);
            refreshProfessors();
            print('You just selected ${selection.Name} with ID ${selection.ID}');
          },
        ),
        SizedBox(height: 5.0),
      ],
    ),
  );
}
