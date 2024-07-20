import 'package:flutter/material.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/screens/Professor.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart'; 

Widget professorsWidget({
  required List<Name_ID>? professors,
}) {
  return Expanded(
    child: ListView.builder(
      itemCount: professors!.length,
      itemBuilder: (context, index) {
        final professor = professors[index];
        return GestureDetector(
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) => Professor(
              name: professor.Name,
              rating: (index + 1) % 5,
              id: professor.ID,
              )));
          },
          child: Container(
            height: 100.0,
            margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
            padding: EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Color(0xff17203a),
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: Column(
              children: [
                SizedBox(height: 5.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      professors[index].Name,
                      style: TextStyle(color: Colors.white, fontSize: 18.0),
                    ),
                    RatingBar.builder(
                      ignoreGestures: true,
                      itemSize: 20.0,
                      initialRating: index.toDouble() % 5 + 1,
                      minRating: 0,
                      direction: Axis.horizontal,
                      itemCount: 5,
                      itemPadding: EdgeInsets.symmetric(horizontal: 0.0),
                      itemBuilder: (context, _) => Icon(
                        Icons.star,
                        color: Colors.amber,
                      ),
                      onRatingUpdate: (rating) {
                        print(rating);
                      },
                    ),
                  ],
                ),
                SizedBox(height: 10.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      "Course Name ${index.toString()}",
                      style: TextStyle(color: Colors.white, fontSize: 12.0),
                    )
                  ],
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
}
