import 'dart:math';
import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flip_card/flip_card.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:app/API_services/API.dart';

String formatGrade(String grade) {
  // Convert the string to uppercase and split by underscore
  List<String> parts = grade.toUpperCase().split('_');
  
  // Handle different cases based on the parts
  if (parts.length == 1) {
    // Single part, likely no underscores
    switch (parts[0]) {
      case 'INCOMPLETE':
        return 'Incomplete';
      case 'WITHDRAWN':
        return 'Withdrawn';
      case 'NOT_SURE':
        return 'Not Sure';
      case 'OTHER':
        return 'Other';
      default:
        // For other grades like A, B, C, etc.
        return parts[0];
    }
  } else if (parts.length == 2) {
    // Handle cases with underscores
    String letter = parts[0];
    String modifier = parts[1];
    
    if (modifier == 'PLUS') {
      return '$letter+';
    } else if (modifier == 'MINUS') {
      return '$letter-';
    } else {
      // If no modifier, just return the letter
      return letter;
    }
  } else {
    // Return the original string if it doesn't match any expected format
    return grade;
  }
}

String formatTagName(String tag) {
  // Convert to lowercase and replace underscores with spaces
  String formattedTag = tag.toLowerCase().replaceAll('_', ' ');

  // Shorten the tag names if necessary
  switch (formattedTag) {
    case 'tough grader':
      return 'tough grader';
    case 'extra credit':
      return 'extra credit';
    case 'group projects':
      return 'group projects';
    case 'amazing lectures':
      return 'lectures';
    case 'lots of homework':
      return 'homework';
    case 'tests are tough':
      return 'tests tough';
    case 'test heavy':
      return 'test heavy';
    case 'extra credit offered':
      return 'extra credit';
    default:
      return formattedTag;
  }
}

int roundUpToReasonableNumber(int value) {
  if (value <= 10) {
    return ((value + 9) ~/ 10) * 10; 
  } else if (value <= 100) {
    return ((value + 9) ~/ 10) * 10; 
  } else if (value <= 1000) {
    return ((value + 99) ~/ 100) * 100;
  } else {
    return ((value + 999) ~/ 1000) * 1000;
  }
}

int getGreatestRoundedAmount(List<RatingData> data) {
  int greatestAmount = data.map((e) => e.amount).reduce((a, b) => a > b ? a : b);
  return roundUpToReasonableNumber(greatestAmount);
}
class RatingData {
  RatingData(this.value, this.amount);

  final String value;
  int amount;

}

List<RatingData> tagData = [];

List<RatingData> ratingData= [ 
      RatingData('1 ★', 0),
      RatingData('2 ★', 0),
      RatingData('3 ★', 0),
      RatingData('4 ★', 0),
      RatingData('5 ★', 0),
  ];


late String totalRatings= "N/A";
late String totalQualityAverage= "N/A";
late String totalDifficultyAverage= "N/A";
late String topKMostRecentQualityAverage= "N/A";
late String topKMostRecentDifficultyAverage= "N/A";
late String averageGrade= "N/A";

class Professor extends StatefulWidget {
  final String name;
  final int id;

  final Random random = Random();

  Professor({required this.name, required this.id});

   @override
  _ProfessorState createState() => _ProfessorState();

  }

class _ProfessorState extends State<Professor> {

  final Random random = Random();


   Future<void>  getProfessor(BuildContext context, int id) async {
    await getProfessorRating(context, id);
    await getProfessorAnalysis(context, id);
  }

  @override
  // void initState() {
  //   super.initState();
  //   //getProfessorRating(context, widget.id);
  //   print("doneeeeeeeeeeeeeee");  
  // }
  

  @override
  Widget build(BuildContext context) {
    print('professor name: ${widget.name} rating: $totalQualityAverage id: ${widget.id}'); 
    return Scaffold(
     appBar: AppBar(
      title: Row(
        children: [
          Icon(Icons.school, color: Colors.black, size: 50),
          SizedBox(width: 10),
          Text(
            '${widget.name}',
            style: TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ],
      ),
    ),
      body:
      FutureBuilder(
      future: getProfessor(context, widget.id), // Replace with your async function
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          // Display data
          return Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 50,
                  width: 175,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: Colors.white,
                    boxShadow:  [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Average Grade: $averageGrade',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),  
                
                SizedBox(width: 25.0),

                Container(
                  height: 50,
                  width: 175,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: Colors.white,
                    boxShadow:  [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                  alignment: Alignment.center,
                  child: Text(
                      'Total Ratings: ${totalRatings}',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                )
                    
                
              ],
            ),

            SizedBox(height: 20.0),
            
            Expanded(
              child: ListView.builder(
                itemCount: 1, // Replace with your actual item count
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: 20.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          FlipCard(
                            direction: FlipDirection.HORIZONTAL,
                            side: CardSide.FRONT,
                            speed: 600,
                            onFlipDone: (status) {
                              print(status);
                            },

                            back: Container(
                             
                              alignment: Alignment.center,
                              height: 350,
                              width: 350,
                              decoration: BoxDecoration(
                                boxShadow:  [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.5),
                                    spreadRadius: 5,
                                    blurRadius: 7,
                                    offset: Offset(0, 3), // changes position of shadow
                                  ),
                                ],
                                color: Colors.white,
                                borderRadius: BorderRadius.all(Radius.circular(20.0)),
                              ),


                              child: Container(
                                
                                alignment: Alignment.center,
                                height: 300,
                                width: 300,

                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: <Widget>[
                                    Text(
                                    'Tags: ',
                                    style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                                    ),

                                    SizedBox(height: 20.0),

                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        
                                        Container(
                                          alignment: Alignment.center,
                                          height: 230,
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
                                                fontSize: 12,
                                              ),
                                              getTitle: (index, angle) {
                                                final usedAngle = angle;
                                                return RadarChartTitle(
                                                  text: formatTagName(tagData[index].value.toString()),
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
                                                    RadarEntry(value: tagData[0].amount.toDouble()),
                                                    RadarEntry(value: tagData[1].amount.toDouble()),
                                                    RadarEntry(value: tagData[2].amount.toDouble()),
                                                    RadarEntry(value: tagData[3].amount.toDouble()),
                                                    RadarEntry(value: tagData[4].amount.toDouble()),
                                                    RadarEntry(value: tagData[5].amount.toDouble()),
                                                    RadarEntry(value: tagData[6].amount.toDouble()),
                                                    RadarEntry(value: tagData[7].amount.toDouble()),
                                                  ],
                                                ),
                                                //this is used to ensure the lowest tic on the chart is 0
                                                RadarDataSet(
                                                  entryRadius: 5,
                                                  fillColor: Colors.transparent,
                                                  borderColor: Colors.transparent,
                                                  dataEntries: [
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                    RadarEntry(value: 0),
                                                  ],
                                                ),

                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),

                                    Row(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      
                                        Icon(
                                          size: 20.0,
                                          Icons.touch_app_outlined, 
                                          color: Colors.black,
                                        ),
                                    ],
                                    )
                                     
                                  ],
                                ),
                              ),
                            ),


                            front: Container(
                              alignment: Alignment.center,
                              height: 350,
                              width: 350,
                              decoration: BoxDecoration(
                                boxShadow:  [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.5),
                                    spreadRadius: 5,
                                    blurRadius: 7,
                                    offset: Offset(0, 3), // changes position of shadow
                                  ),
                                ],
                                color: Colors.white,
                                borderRadius: BorderRadius.all(Radius.circular(20.0)),
                              ),

                              child: Container(
                                
                                alignment: Alignment.center,
                                height: 300,
                                width: 300,

                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Row(
                                      children: [
                                        Text(
                                          "Rating: ",
                                          style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                                        ),
                                        RatingBar.builder(
                                          ignoreGestures: true,
                                          itemSize: 25.0,
                                          initialRating: totalQualityAverage != "N/A" ? double.parse(totalQualityAverage) : 0.0,
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

                                        // SizedBox(width: 95.0),
                                        //   Icon(
                                        //     size: 20.0,
                                        //     Icons.menu, 
                                        //     color: Colors.black,
                                        //   ),
                                      ],
                                    ),

                                    SizedBox(height: 20.0),
                                    
                                     Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        
                                        Container(
                                          alignment: Alignment.center,
                                          height: 231,
                                          width: 250,
                                          child: 
                                          SfCartesianChart(
                                            //enableSideBySideSeriesPlacement: false,
                                            //plotAreaBorderWidth: 0,
                                            plotAreaBorderWidth: 0,
                                            margin: EdgeInsets.all(0.0),
                                            
                                            primaryXAxis: CategoryAxis(
                                              majorGridLines: MajorGridLines(width: 0),
                                              majorTickLines: MajorTickLines(width: 0),
                                              axisLine: AxisLine(width: 0),
                                              labelStyle: TextStyle(
                                                fontSize: 18,  
                                                fontWeight: FontWeight.bold,
                                                color: Colors.black
                                              ),
                                              
                                            ),
                                            primaryYAxis: NumericAxis(
                                              isVisible: false,
                                              minimum: 0,
                                              maximum: getGreatestRoundedAmount(ratingData).toDouble(),
                                              interval: 20,
                                              majorGridLines: MajorGridLines(width: 0),
                                              minorGridLines: MinorGridLines(width: 0),
                                            ),

                                            series: <CartesianSeries>[
                                              BarSeries<RatingData, String>(
                                                dataSource: ratingData,
                                                xValueMapper: (RatingData data, _) => data.value,
                                                yValueMapper: (RatingData data, _) => data.amount,
                                                //dataLabelSettings: DataLabelSettings(isVisible: true),
                                                dataLabelSettings: DataLabelSettings(
                                                  labelPosition: ChartDataLabelPosition.inside,
                                                  isVisible: true,
                                                  textStyle: TextStyle(
                                                    fontSize: 14,  // Set the font size for the data labels
                                                    fontWeight: FontWeight.w900,  // Set the font weight for the data labels
                                                    color: Colors.black,  // Set the color for the data labels
                                                  ),
                                                ),

                                                borderRadius: BorderRadius.all(Radius.circular(15)),
                                                color: Colors.amber, // Set the bar color to gold
                                                width: 0.6, // Set the bar width
                                                spacing: 0.3, // Set the spacing between bars
                                                //orientation: BarOrientation.horizontal,
                                              )
                                            ],
                                            
                                      
                                          ),
                                        ),
                                      ],
                                     ),

                                     Row(
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      children: [
                                       
                                          Icon(
                                            size: 20.0,
                                            Icons.touch_app_outlined, 
                                            color: Colors.black,
                                          ),
                                      ],
                                     )
                                     
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ]
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
      )
    ;
        }
      },
    ),


    );
  }
}
