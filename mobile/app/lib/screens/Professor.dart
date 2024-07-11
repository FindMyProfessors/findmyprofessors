import 'dart:math';

import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class Professor extends StatelessWidget {
  final String item;
  final int rating;
  Random random = Random();

  Professor({required this.item, required this.rating});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Professor "+item),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
                
            Text(
              'Details for professor $item',
              style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
            ),

            SizedBox(height: 20.0),

            Row(
              children: [
                // Text(
                //    "Rating: ",
                //    style: TextStyle(
                //      fontSize: 20.0,
                //      fontWeight: FontWeight.bold,
                //      color: Colors.black
                //     )
                // ),
                //SizedBox(width: 10.0),

                RatingBar.builder(
                  itemSize: 30.0,
                  initialRating: rating.toDouble(),
                  minRating: 1,
                  direction: Axis.horizontal,
                  allowHalfRating: true,
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

            SizedBox(height: 40.0),

            Text(
              'Parameters: ',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),

            SizedBox(height: 20.0),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  alignment: Alignment.center,
                  height: 250,
                  width: 250,
                  child: 
                    RadarChart(
                      RadarChartData(
                        titlePositionPercentageOffset: 0.2,       // Set the distance between the graph edge and the titles text
                        radarBackgroundColor: Colors.transparent, // Set the background color of the graph to be transparent
                        radarShape: RadarShape.polygon,           // Set the shape of the graph to be a polygon (instead of the default circle)
                        radarBorderData: const BorderSide(
                          color: Colors.grey,   // Set the color of outermost tick line
                          width: 0.5,           // Set the width of outermost tick line
                        ),
                        tickCount: 5,           // Set the number of tick lines that go around the center
                        tickBorderData: const BorderSide(
                          color: Colors.grey,   // Set the color of inside tick lines that go around the center
                          width: 0.5,           // Set the width of inside tick lines that go around the center
                        ),
                        ticksTextStyle: const TextStyle(
                          color: Colors.black,         // Set the color of the tick text (numbers shown inside the chart)
                          fontWeight: FontWeight.w500, // Set the font weight of the tick text (numbers shown inside the chart)
                          fontSize: 9,                 // Set the font size of the tick text (numbers shown inside the chart)
                        ),
                        gridBorderData: const BorderSide(
                          color: Colors.grey, // Set the color of the grid lines that expand out from the center
                          width: 1,           // Set the width of the grid lines that expand out from the center
                        ),
                        titleTextStyle: const TextStyle(
                          color: Colors.black,         // Set the color of the title text that goes around the chart
                          fontWeight: FontWeight.w500, // Set the font weight of the title text that goes around the chart
                          fontSize: 11,                // Set the font size of the title text that goes around the chart
                        ),

                        getTitle: (index, angle) {
                          final usedAngle = angle;
                              return RadarChartTitle(
                                text: 'Parameter ' + index.toString(),
                                angle: usedAngle,
                                positionPercentageOffset: .05);
                        },
                        
                        dataSets: [
                          RadarDataSet(
                            fillColor: Colors.black.withOpacity(0.3),
                            borderColor: Colors.black,
                            borderWidth: 2,
                            entryRadius: 5,
                            dataEntries: [
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                              RadarEntry(value: random.nextDouble() * 5),
                            ],
                          ),
                        ],
                        
                      ),
                      //swapAnimationDuration: Duration(milliseconds: 10), // Optional
                      //swapAnimationCurve: Curves.linear, // Optional
                    ),
                  ),
              ],
            ),
            
            
            SizedBox(height: 20.0),
            Text(
              'This is some additional information about $item',
              style: TextStyle(fontSize: 16.0),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Add to Course Cart'),
            ),
          ],
        ),
      ),
    );
  }
}
