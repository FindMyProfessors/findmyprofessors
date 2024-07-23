import 'dart:math';
import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flip_card/flip_card.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:app/API_services/API.dart';

Color gradeColor = Colors.black;

class AverageRatingValue {
  var value;
  var month;
  var year;

  AverageRatingValue({
    required this.value,
    required this.month,
    required this.year,
  });

  // You can add a factory constructor to create an instance from JSON if needed
  factory AverageRatingValue.fromJson(Map<String, dynamic> json) {
    return AverageRatingValue(
      value: json['value'],
      month: json['month'],
      year: json['year'],
    );
  }
}

List<AverageRatingValue> averageRatingValues = [];


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
  String formattedTag = tag.toLowerCase().replaceAll('_', ' ');
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
    case 'would take again':
      return 'take again';
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

late String averageGrade= "N/A";
late String totalRatings= "N/A";

late String totalQualityAverage= "N/A";
late String totalDifficultyAverage= "N/A";

late String topKMostRecentQualityAverage= "N/A";
late String topKMostRecentDifficultyAverage= "N/A";

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
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
      title: Container(
      padding: EdgeInsets.all(8.0), 
      child: Row(
        children: [
          Icon(Icons.school, color: Colors.black, size: 40),
          SizedBox(width: 10),
          Text(
            '${widget.name}',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ],
      ),
    ),
    ),
      body:
      FutureBuilder(
      future: getProfessor(context, widget.id), 
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          return Container(
            color: Color(0xff17203a),
            child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: 
                    Column(
            
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            
              SizedBox(height: 20.0),
              
              Expanded(
                child: ListView.builder(
                  itemCount: 1, 
                  itemBuilder: (BuildContext context, int index) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                SizedBox(width: 10),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                  
                                    Text(
                                      'Average grade:',
                                      style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                      ),
                                    ),                                
                                    //SizedBox(width: 50),
                                    Text(
                                      '$averageGrade',
                                      style: TextStyle(
                                        fontSize: 125,
                                        fontWeight: FontWeight.bold,
                                        color: gradeColor,
                                  )),
                                  
                                    
            
                                  ],
                                ),
                              ]
                            ),
                            
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Container(
                              height: 50,
                              width: 175,
                              decoration: BoxDecoration(
                                // border:  Border.all(
                                //   color: Colors.black,
                                // ),
                                borderRadius: BorderRadius.circular(20.0),
                                color: Colors.white,
                                boxShadow:  [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    spreadRadius: 2,
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
                            ),
            
                            SizedBox(height: 10),
            
                            Container(
                              height: 50,
                              width: 175,
                              decoration: BoxDecoration(
                                boxShadow:  [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    spreadRadius: 2,
                                    blurRadius: 7,
                                    offset: Offset(0, 3), // changes position of shadow
                                  ),
                                ],
                                borderRadius: BorderRadius.circular(20.0),
                                color: Colors.white,
                                
                              ),
                              alignment: Alignment.center,
                              child: Text(
                                  'Recent Ratings: ${topKMostRecentQualityAverage}',
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black,
                                  ),
                                ),
                            ),
            
                            SizedBox(height: 10),
            
                            Container(
                              height: 50,
                              width: 175,
                              decoration: BoxDecoration(
                                boxShadow:  [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    spreadRadius: 2,
                                    blurRadius: 7,
                                    offset: Offset(0, 3), // changes position of shadow
                                  ),
                                ],
                                borderRadius: BorderRadius.circular(20.0),
                                color: Colors.white,
                                
                              ),
                              alignment: Alignment.center,
                              child: Text(
                                  'Recent Difficulty: ${topKMostRecentDifficultyAverage}',
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black,
                                  ),
                                ),
                            )
            
                              ],
                            ),
                          ],
                        ),
                        
                     
                        SizedBox(height: 20.0),
            
                        Container(
                          height: 350,
                          width: 600,
                            // decoration: BoxDecoration(
                            //   border:  Border.all(
                            //     color: Colors.black,
                            //   ),
                            //   borderRadius: BorderRadius.circular(20.0),
                            //   color: Colors.white,
                            // ),
                            alignment: Alignment.center,
                            // height: 300,
                            // width: 300,
            
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Row(
                                children: [
                                  SizedBox(width: 10.0),
                                  Text(
                                    "Rating: ",
                                    style: TextStyle(
                                      fontSize: 20.0, 
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold
                                      ),
                                  ),
                                  RatingBar.builder(
                                    unratedColor: Colors.white,
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
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                SizedBox(width: 30.0),
                                Container(
                                  // decoration: BoxDecoration
                                  // (
                                  //   border:  Border.all
                                  //   (
                                  //     color: Colors.black,
                                  //   ),
                                  //   borderRadius: BorderRadius.circular(20.0),
                                  //   color: Colors.white,
                                  // ),
                                  alignment: Alignment.topLeft,
                                  height: 260,
                                  width: 300,
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
                                        color: Colors.white
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
                                        dataLabelSettings: DataLabelSettings(
                                          labelPosition: ChartDataLabelPosition.inside,
                                          isVisible: true,
                                          textStyle: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w900,  
                                            color: Colors.white,  
                                          ),
                                        ),
            
                                        borderRadius: BorderRadius.all(Radius.circular(15)),
                                        color: Colors.amber, 
                                        width: 0.6, 
                                        spacing: 0.3,
                                      )
                                    ],
                                    
                              
                                  ),
                                ),
                              ],
                              ),
            
                              
                            ],
                          ),
                        ),
                        
                      
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
            
                              front: Container(
                               
                                alignment: Alignment.center,
                                height: 325,
                                width: 325,
                                decoration: BoxDecoration(
                                  boxShadow:  [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.5),
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
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: <Widget>[
                                      Center(
                                        child: Text(
                                          'Tags: ',
                                          style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                                        ),
                                      ),
            
                                      SizedBox(height: 20.0),
            
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          
                                          Container(
                                            alignment: Alignment.center,
                                            height: 225,
                                            width: 275,
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
            
            
                              back: Container(
                          
                                alignment: Alignment.center,
                                height: 325,
                                width: 325,
                                decoration: BoxDecoration(
                                  boxShadow:  [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.5),
                                      spreadRadius: 5,
                                      blurRadius: 7,
                                      offset: Offset(0, 3), // changes position of shadow
                                    ),
                                  ],
                                  color: Colors.white,
                                  borderRadius: BorderRadius.all(Radius.circular(20.0)),
                                ),
                              child: 
                              Column(
                                children: [
                                  SizedBox(height: 20.0),
                                  Center(
                                    child: Text(
                                    'Average Rating Over Time: ',
                                    style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                                  ),
                                  ) ,
                                  
                                  SizedBox(height: 20.0),
                                  Container(
                                    alignment: Alignment.bottomLeft,
                                    height: 250,
                                    width: 275,
                                    child:  LineChart(
                                      LineChartData(
                                        gridData: FlGridData(show: true),
                                        titlesData: FlTitlesData(
                                          bottomTitles: AxisTitles(
                                            sideTitles: SideTitles(
                                              showTitles: true,
                                              reservedSize: 40, // Space for titles
                                              getTitlesWidget: (value, meta) {
                                                final index = value.toInt();
                                                if (index < 0 || index >= averageRatingValues.length) {
                                                  return Container();
                                                }
            
                                                final monthName = averageRatingValues[index].month;
                                                final year = averageRatingValues[index].year.toString().substring(2);
            
                                                final monthMap = {
                                                  'January': '1',
                                                  'February': '2',
                                                  'March': '3',
                                                  'April': '4',
                                                  'May': '5',
                                                  'June': '6',
                                                  'July': '7',
                                                  'August': '8',
                                                  'September': '9',
                                                  'October': '10',
                                                  'November': '11',
                                                  'December': '12',
                                                };
            
                                                final month = monthMap[monthName] ?? '1'; // Default to '1' if month not found
            
                                                return SideTitleWidget(
                                                  axisSide: meta.axisSide,
                                                  child: Text('$month/${year}', style: TextStyle(fontSize: 12)),
                                                );
                                              },
                                              interval: 1, // Make sure you set the interval correctly if needed
                                            ),
                                          ),
                                          leftTitles: AxisTitles(
                                            sideTitles: SideTitles(
                                              showTitles: true,
                                              reservedSize: 40, // Space for titles
                                              getTitlesWidget: (value, meta) {
                                                if (value < 1 || value > 5) {
                                                  return Container();
                                                }
                                                return SideTitleWidget(
                                                  axisSide: meta.axisSide,
                                                  child: Text(value.toStringAsFixed(1)), // Format y-axis value to one decimal place
                                                );
                                              },
                                            ),
                                          ),
                                          topTitles: AxisTitles(
                                            sideTitles: SideTitles(
                                              showTitles: false,
                                            ),
                                          ),
                                          rightTitles: AxisTitles(
                                            sideTitles: SideTitles(
                                              showTitles: false,
                                            ),
                                          ),
                                        ),
                                        borderData: FlBorderData(
                                          show: true,
                                          border: Border.all(color: const Color(0xff37434d), width: 1),
                                        ),
                                        minX: 0,
                                        maxX: (averageRatingValues.length - 1).toDouble(),
                                        minY: 1,
                                        maxY: 5,
                                        lineBarsData: [
                                          LineChartBarData(
                                            spots: averageRatingValues.asMap().entries.map((e) {
                                              return FlSpot(e.key.toDouble(), e.value.value);
                                            }).toList(),
                                            isCurved: true,
                                            barWidth: 4,
                                            belowBarData: BarAreaData(show: false),
                                            dotData: FlDotData(show: false),
                                          ),
                                        ],
                                      ),
                                    ),
                                  
                                  ),
                            ],
                          )
            
                          
                          ),
                        
                            ),
                          ]
                        ),
            
                        SizedBox(height: 30.0),
                        
                        // Text(
                        //   'Average Rating Over Time', 
                        //   style: 
                        //     TextStyle(
                        //       fontSize: 20.0, 
                        //       fontWeight: FontWeight.bold
                        //     )),
                        
                        //SizedBox(height: 10.0),
            
                        
                        // Container(
                        //   height: 350,
                        //   width: 350,
                        //   child: 
                        //   LineChart(
                        //       LineChartData(
                        //         gridData: FlGridData(show: true),
                        //         titlesData: FlTitlesData(
                        //           bottomTitles: AxisTitles(
                        //             sideTitles: SideTitles(
                        //               showTitles: true,
                        //               reservedSize: 40, // Space for titles
                        //               getTitlesWidget: (value, meta) {
                        //                 final index = value.toInt();
                        //                 if (index < 0 || index >= averageRatingValues.length) {
                        //                   return Container();
                        //                 }
            
                        //                 final monthName = averageRatingValues[index].month;
                        //                 final year = averageRatingValues[index].year.toString().substring(2);
            
                        //                 final monthMap = {
                        //                   'January': '1',
                        //                   'February': '2',
                        //                   'March': '3',
                        //                   'April': '4',
                        //                   'May': '5',
                        //                   'June': '6',
                        //                   'July': '7',
                        //                   'August': '8',
                        //                   'September': '9',
                        //                   'October': '10',
                        //                   'November': '11',
                        //                   'December': '12',
                        //                 };
            
                        //                 final month = monthMap[monthName] ?? '1'; // Default to '1' if month not found
            
                        //                 return SideTitleWidget(
                        //                   axisSide: meta.axisSide,
                        //                   child: Text('$month/${year}', style: TextStyle(fontSize: 12)),
                        //                 );
                        //               },
                        //               interval: 1, // Make sure you set the interval correctly if needed
                        //             ),
                        //           ),
                        //           leftTitles: AxisTitles(
                        //             sideTitles: SideTitles(
                        //               showTitles: true,
                        //               reservedSize: 40, // Space for titles
                        //               getTitlesWidget: (value, meta) {
                        //                 if (value < 1 || value > 5) {
                        //                   return Container();
                        //                 }
                        //                 return SideTitleWidget(
                        //                   axisSide: meta.axisSide,
                        //                   child: Text(value.toStringAsFixed(1)), // Format y-axis value to one decimal place
                        //                 );
                        //               },
                        //             ),
                        //           ),
                        //           topTitles: AxisTitles(
                        //             sideTitles: SideTitles(
                        //               showTitles: false,
                        //             ),
                        //           ),
                        //           rightTitles: AxisTitles(
                        //             sideTitles: SideTitles(
                        //               showTitles: false,
                        //             ),
                        //           ),
                        //         ),
                        //         borderData: FlBorderData(
                        //           show: true,
                        //           border: Border.all(color: const Color(0xff37434d), width: 1),
                        //         ),
                        //         minX: 0,
                        //         maxX: (averageRatingValues.length - 1).toDouble(),
                        //         minY: 1,
                        //         maxY: 5,
                        //         lineBarsData: [
                        //           LineChartBarData(
                        //             spots: averageRatingValues.asMap().entries.map((e) {
                        //               return FlSpot(e.key.toDouble(), e.value.value);
                        //             }).toList(),
                        //             isCurved: true,
                        //             barWidth: 4,
                        //             belowBarData: BarAreaData(show: false),
                        //             dotData: FlDotData(show: false),
                        //           ),
                        //         ],
                        //       ),
                        //     ),
                        //   ),
                        
                        SizedBox(height: 20.0),
            
                        // ElevatedButton(
                        //   onPressed: () {
                        //     Navigator.pop(context);
                        //   },
                        //   child: Text('Add to Course Cart'),
                        // ),
            
                      ],
                    );
                  },
                )
              ),
            ],
                    ),
                  
                  ),
          )
    ;
        }
      },
    ),


    );
  }
}
