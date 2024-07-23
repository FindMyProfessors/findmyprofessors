import 'package:flutter/material.dart';

const lightColorScheme = ColorScheme(
  brightness: Brightness.light,
  primary: Color(0xff416fdf),
  onPrimary: Color(0xFFFFFFFF),
  secondary: Color(0xff6eaee7),
  onSecondary: Color(0xFFFFFFFF),
  error: Color(0xFFBA1A1A),
  onError: Color(0xFFFFFFFF),
  shadow: Color(0xFF000000),
  outlineVariant: Color(0xFFC2C8BC),
  surface: Color(0xFFF9FAF3),
  onSurface: Color(0xFF1A1C18),
);

const DarkColorScheme = ColorScheme(
  brightness: Brightness.dark,
  primary: Color(0xff416fdf),
  onPrimary: Color(0xFFFFFFFF),
  secondary: Color(0xff6eaee7),
  onSecondary: Color(0xFFFFFFFF),
  error: Color(0xFFBA1A1A),
  onError: Color(0xFFFFFFFF),
  shadow: Color(0xFF000000),
  outlineVariant: Color(0xFF494F48),
  surface: Color(0xFF121212),
  onSurface: Color(0xFFE0E3D7),
);


//39:28
ThemeData lighMode= ThemeData(
  colorScheme: lightColorScheme,
  useMaterial3: true,

  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      
      backgroundColor: lightColorScheme.primary,
      foregroundColor: lightColorScheme.onPrimary,
    ),
  ),

);

ThemeData darkMode= ThemeData(
  colorScheme: DarkColorScheme,
  useMaterial3: true,
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: DarkColorScheme.primary,
      foregroundColor: DarkColorScheme.onPrimary,
    ),
  ),
);