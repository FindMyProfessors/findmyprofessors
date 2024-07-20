import 'dart:math';
import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class Professor extends StatelessWidget {
  final String name;
  final int rating;
  final int id;

  final Random random = Random();

  Professor({required this.name, required this.rating, required this.id});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Professor "+name),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
                
            Text(
              'Details for professor $name',
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
                  ignoreGestures: true,
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
            
            Expanded(
              child: ListView.builder(
                itemCount: 1, // Replace with your actual item count
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: 20.0),
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
                            child: RadarChart(
                              RadarChartData(
                                titlePositionPercentageOffset: 0.2,
                                radarBackgroundColor: Colors.transparent,
                                radarShape: RadarShape.polygon,
                                radarBorderData: BorderSide(
                                  color: Colors.grey,
                                  width: 0.5,
                                ),
                                tickCount: 5,
                                tickBorderData: BorderSide(
                                  color: Colors.grey,
                                  width: 0.5,
                                ),
                                ticksTextStyle: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 9,
                                ),
                                gridBorderData: BorderSide(
                                  color: Colors.grey,
                                  width: 1,
                                ),
                                titleTextStyle: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 11,
                                ),
                                getTitle: (index, angle) {
                                  final usedAngle = angle;
                                  return RadarChartTitle(
                                    text: 'Parameter ' + index.toString(),
                                    angle: usedAngle,
                                    positionPercentageOffset: .05,
                                  );
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
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 20.0),

                      Text(
                        'This is some additional information about Item $index',
                        style: TextStyle(fontSize: 16.0),
                      ),

                      SizedBox(height: 20.0),

                      Container(
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.grey,
                          )
                        ),
                        height: 250,
                        width: double.infinity,
                        child: DataTable2(
                          columnSpacing: 12,
                          horizontalMargin: 12,
                          minWidth: 600,
                          columns: [
                            DataColumn2(
                              label: Text('Column A'),
                              size: ColumnSize.L,
                            ),
                            DataColumn(
                              label: Text('Column B'),
                            ),
                            DataColumn(
                              label: Text('Column C'),
                            ),
                            DataColumn(
                              label: Text('Column D'),
                            ),
                            DataColumn(
                              label: Text('Column NUMBERS'),
                              numeric: true,
                            ),
                          ],
                          rows: List<DataRow>.generate(
                            100,
                            (index) => DataRow(cells: [
                              DataCell(Text('A' * (10 - index % 10))),
                              DataCell(Text('B' * (10 - (index + 5) % 10))),
                              DataCell(Text('C' * (15 - (index + 5) % 10))),
                              DataCell(Text('D' * (15 - (index + 10) % 10))),
                              DataCell(Text(((index + 0.1) * 25.4).toString())),
                            ]),
                          ),
                        ),
                      ),
                      SizedBox(height: 20.0),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text('Add to Course Cart'),
                      ),
                    ],
                  );
                },
              )
            ),
          
          ],
        ),
      ),
    );
  }
}
