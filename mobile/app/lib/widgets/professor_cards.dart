import 'package:flutter/material.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/screens/Professor.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart'; 


Widget professorsWidget({
  required List<professorObject>? professors,
}) {
  return Expanded(
    child: ListView.builder(
      itemCount: professors!.length,
      itemBuilder: (context, index) {
        final professor = professors[index];
        final rmp_id = professor.rmp_id.toString();
        return GestureDetector(
          onTap: () {
            if(rmp_id != ""){
              Navigator.of(context).push(MaterialPageRoute(builder: (context) => Professor(
                name: professor.name,
                id: professor.id,
              )));
            }
            else
            {
             ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('It seems we have no data for this professor.')),
              );
            }
          },
          child: Container(
            height: 100.0,
            margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
            padding: EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Color(0xff17203a),
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(height: 5.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          professors[index].name,
                          style: TextStyle(color: Colors.white, fontSize: 18.0),
                        ),
                        // RatingBar.builder(
                        //   ignoreGestures: true,
                        //   itemSize: 20.0,
                        //   initialRating: index.toDouble() % 5 + 1,
                        //   minRating: 0,
                        //   direction: Axis.horizontal,
                        //   itemCount: 5,
                        //   itemPadding: EdgeInsets.symmetric(horizontal: 0.0),
                        //   itemBuilder: (context, _) => Icon(
                        //     Icons.star,
                        //     color: Colors.amber,
                        //   ),
                        //   onRatingUpdate: (rating) {
                        //     print(rating);
                        //   },
                        // ),
                      ],
                    ),
                    SizedBox(height: 10.0),
                    // Row(
                    //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    //   children: <Widget>[
                    //     Text(
                    //       "Course Name ${index.toString()}",
                    //       style: TextStyle(color: Colors.white, fontSize: 12.0),
                    //     )
                    //   ],
                    // ),
                  ],
                ),
                
                Icon(
                  Icons.chevron_right,
                  color: Colors.white,
                  size: 30.0,
                )
              ],
            ),
          ),
        );
      },
    ),
  );
}
